import prisma from "../config/db.js";
import dotenv from 'dotenv'
import { destinoId } from "./validations/prismaValidate.js";


dotenv.config()


export const createNotasService = async (req, dataNotas) => {
    const file = req.file;
    const uploadFile = file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}` : '';

    const { titulo, autorId, asunto, estado } = dataNotas;

    const parseId = parseInt(autorId)

    const newNotas = await prisma.nota.create({
        data: {
            asunto: asunto,
            titulo: titulo,
            autorId: parseId,
            estado: estado,
            seguimiento:{
                create:{
                    archivos:{
                        create:{
                            ruta: uploadFile,
                            nombre: file ? file.originalname : null
                        }
                    } 
                }
            }
        }
    });
    return newNotas;
};


export const createCarpetaService = async (dataCarpetas) => {
    
    const {nombre, seguimientoId} = dataCarpetas;

    const newCarpeta = await prisma.carpeta.create({
        data:{
            nombre: nombre,
            seguimiento:{
                connect:{id: seguimientoId}
            }
        }
    })
    return newCarpeta;
}




export const createFileByCarpetaService = async(req, dataFile) => {
    try {
    const {carpetaId, seguimientoId} = dataFile;
    const file = req.file;
    const uploadFile = file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}` : '';


    const findFolder = await prisma.carpeta.findUnique({
        where:{
            id: parseInt(carpetaId)
        }
    })
    if(!findFolder){
        return res.json({error: "No se encuentra la carpeta"})
    }
    const newFile = await prisma.archivo.create({
            data:{
                ruta: uploadFile,
                nombre: file ? file.originalname : null, 
                carpeta:{
                    connect: {id: parseInt(carpetaId)}
                },
                seguimiento:{
                    connect: {id: parseInt(seguimientoId) }
                }
            }
    })
    return newFile;
    } catch (error) {
        console.log(error)
    }
 
}

export const getNotasByEstadoService = async (estado) =>  {
    try {
        const nota = await prisma.nota.findMany({
            where: {
                estado: estado
            },
            include:{
                seguimiento: {
                    include: {
                        archivo: true
                    }
                }
            },
        })
        return nota;
    } catch (error) {
        console.log(error)
    }
}

export const downloadFileService = async (req, res) => {

    try {
        const { id } = req.params;
        const archivo = await prisma.archivo.findUnique({
            where: { id: parseInt(id) },
        });

        if (!archivo) {
            console.log("Archivo no encontrado");
            return res.status(404).send("Archivo no encontrado");
        }
        
        const fileUrl = archivo.ruta;
        const rutaLocalRelativa = fileUrl.replace(/^.*\/\/[^\/]+/, '');
        const rutaEnPC = `src/middlewares${rutaLocalRelativa}`;
        
        res.download(rutaEnPC);
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
        res.status(500).send("Error al descargar el archivo");
    }
}

export const updateNotasService = async(nro_referencia, dataNotas) => {
    
    const { motivo, nro_pedido, estado, observaciones} = dataNotas
    const pedidoInt = parseInt(nro_pedido)
    const referenciaInt = parseInt(nro_referencia)
    try {
        const existingNota = await prisma.nota.findUnique({
            where: {
                nro_referencia: referenciaInt
            },
            include: {
                seguimiento: {
                    include: {
                        archivo: true
                    }
                }
            }
            
        });

        if (!existingNota) {
            throw new Error('Nota no encontrada');
        }

        const updateData = {};

        if (motivo !== undefined) {
            updateData.motivo = motivo;
        }
        if (nro_pedido !== undefined) {
            updateData.nro_pedido = pedidoInt;
        }
        if (estado !== undefined) {
            updateData.estado = estado;
            if(estado === 'FINALIZADO'){
            const archivo = await prisma.seguimiento.findFirst({
                where: {
                    notaId: referenciaInt
                },
                include: {archivo: true}
            })
                await prisma.seguimiento.create({
                    data:{
                        destino: archivo.destino,
                        fecha: new Date(),
                        archivo: {
                            create:{
                                ruta:archivo.archivo.ruta,
                                nombre: archivo.archivo.nombre
                            }
                        },
                        nota: {connect: {nro_referencia: referenciaInt}}, 
                    
                    }
                })
            }
        }
        if (observaciones !== undefined) {
            updateData.observaciones = observaciones;
        }
    
        const updatedNota = await prisma.nota.update({
            where: {
                nro_referencia: referenciaInt
            },
            data: updateData
        });
        return { success: "Nota actualizada correctamente", nota: updatedNota };
    } catch (error) {
        console.log(error)
    }
        
}

export const getNotasService = async () => {
    return await prisma.nota.findMany({
        include: {
            seguimiento: {
              include: {
                archivos: true,  
                carpetas: {
                  include: {
                    archivos: true, 
                  },
                }
              }
            },
            autor: true  
          }
    });
}

export const getSeguimientoByIdService = async(nro_referencia) => {

    const idInt = parseInt(nro_referencia)
    return await prisma.seguimiento.findMany({
        where: {
            notaId: idInt
        },
        include: {
            archivos: true,
            carpetas: true
        }
    })
}

export const getNotasByIdService = async (nro_referencia) => {

    const idInt = parseInt(nro_referencia)
    return await prisma.nota.findFirst({
        where: {
            nro_referencia: idInt
        },
        include : {
            seguimiento: {
                include: {
                    archivo: true
                }
            }
        }
    })
}

export const createFileService = async(req, notaId) => {

    const {nro_referencia} = notaId;

    const idInt = parseInt(nro_referencia)
    const destino = await destinoId(idInt)

    const ultimoDestino = destino[destino.length - 1]

    const file = req.file;
    const uploadFile = file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}` : '';

    try {
        const newFile = await prisma.seguimiento.create({
            data:{
                destino: ultimoDestino,
                fecha: new Date(),
                archivo: {
                    create: {
                        ruta: uploadFile,
                        nombre: file ? file.originalname : null,
                    }
                },
                nota: {
                    connect: {
                        nro_referencia: idInt
                    }
                }
            }
        })
        return newFile;
    } catch (error) {
        console.log("Error al crear nuevo archivo: ", error)
    }
}


export const deleteNotaService = async(notaId) => {
    const idInt = parseInt(notaId)
  
    try {
        await prisma.nota.deleteMany({
            where:{
                nro_referencia:idInt
            }
        })

    return { success: "Nota eliminada correctamente" };
    } catch (error) {
        console.log(error)
    }
}
