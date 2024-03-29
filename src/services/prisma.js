import prisma from "../config/db.js";
import dotenv from 'dotenv'
import { destinoId } from "./validations/prismaValidate.js";
import { promisify } from 'util';
import * as fs from 'fs';
dotenv.config()


export const createNotasService = async (req, dataNotas) => {
    
    const file = req.file
    const uploadFile = file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}`: '';

    const { motivo, nro_pedido, estado, observaciones, seguimiento} = dataNotas;

    const pedidoInt = parseInt(nro_pedido)

    const newNotas = await prisma.nota.create({
        data: {
            motivo,
           nro_pedido: pedidoInt,
            estado,
            observaciones,
            seguimiento: {
                create:{
                    destino:
                    seguimiento.destino,
                    archivo:{
                        create:{
                            ruta: uploadFile,
                            nombre: file ? file.originalname : null
                        }
                    }
                }
            }
        }
    })
        
    console.log(newNotas)
        
    
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
        console.log(rutaLocalRelativa)
        
        
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
                    archivo: true
                }
            }
        }
    })
}

export const getSeguimientoByIdService = async(nro_referencia) => {

    const idInt = parseInt(nro_referencia)
    return await prisma.seguimiento.findMany({
        where: {
            notaId: idInt
        },
        include: {
            archivo: true
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