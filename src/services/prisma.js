import prisma from "../config/db.js";
import dotenv from 'dotenv'
import { destinoId } from "./validations/prismaValidate.js";


dotenv.config()


export const createNotasService = async (req, res) => {


    const { content, authorId, title,  } = req.body;


    const newNotas = await prisma.post.create({
        data: {
            title: title,
            content: content,
            authorId: parseInt(authorId),
            state: state === 'PRIVATE' ? 'PRIVATE' : 'PUBLIC'
        }

    });
    return newNotas;
};


export const createCarpetaService = async (dataCarpetas) => {
    
    const {nameFolder, postId} = dataCarpetas;

    const newCarpeta = await prisma.folder.create({
        data:{
            nameFolder: nameFolder,
            postId: postId
        }
    })
    return newCarpeta;
}




export const createFileByCarpetaService = async(req, dataFile) => {
    try {
    const {folderId, postId} = dataFile;
    const file = req.file;
    const uploadFile = file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}` : '';

    const findFolder = await prisma.folder.findUnique({
        where:{
            id: parseInt(folderId)
        }
    })
    if(!findFolder){
        return res.json({error: "No se encuentra la carpeta"})
    }
    const newFile = await prisma.file.create({
            data:{
                url: uploadFile,
                nameFile: file ? file.originalname : null, 
                folder:{
                    connect: {id: parseInt(folderId)}
                },
                post:{
                    connect: {id: parseInt(postId) }
                }
            }
    })
    return newFile;
    } catch (error) {
        console.log(error)
    }
 
}


export const getArchivosByIdCarpetaService = async(data) => {

    const {folderId, postId} = data;
    try {
        const archivosByCarpeta = await prisma.file.findMany({
            where: {
                folderId: parseInt(folderId),
                postId: parseInt(postId)
            }
        })
        return archivosByCarpeta;
    } catch (error) {
        console.log(error)
    }
}

export const getNotasByEstadoService = async (estado) =>  {
    try {
        const nota = await prisma.nota.findMany({
            where: {
                estado: estado
            }
           
        })
        return nota;
    } catch (error) {
        console.log(error)
    }
}

export const downloadFileService = async (req, res) => {

    try {
        const { id } = req.params;
        const existFile = await prisma.file.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existFile) {
            console.log("Archivo no encontrado");
            return res.status(404).send("Archivo no encontrado");
        }
        
        const fileUrl = file.url;
        const rutaLocalRelativa = fileUrl.replace(/^.*\/\/[^\/]+/, '');
        const rutaEnPC = `src/middlewares${rutaLocalRelativa}`;
        
        res.download(rutaEnPC);
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
        res.status(500).send("Error al descargar el archivo");
    }
}

export const updateNotasService = async( dataNotas) => {
    
    const { id, title, content} = dataNotas
    const parseId = parseInt(id)
    try {
        const existingNota = await prisma.post.findUnique({
            where: {
                id: parseId
            },
            });
    
        if (!existingNota) {
            throw new Error('Nota no encontrada');
        }

        const updateData = {};

        if (title !== undefined) {
            updateData.title = title;
        }
        if (content !== undefined) {
            updateData.content = content;
        }
                await prisma.post.update({
                    data:{
                        content: post.content,
                        title: post.title,
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
            
       
    catch (error) {
        return    console.log(error)
    }
        
}

export const getNotasService = async () => {
    try {
      return await prisma.post.findMany({
      include:{
        author:true,
    folder: true,
    file:{where: {folderId:null}}

      }

    }); 

    } catch (error) {
       console.log(error)
    }
}

export const getSeguimientoByIdService = async(nro_referencia) => {

    const idInt = parseInt(nro_referencia)
    const seguimiento =  await prisma.seguimiento.findMany({
        where: {
            notaId: idInt
        },
        include: {
            archivos: true,
            carpetas:{
                include:{
                    archivos: true
                }
            }
        }
    })  
     const filteredSeguimiento = seguimiento.map(s => {
        if (s.carpetas.some(c => c.archivos.length > 0)) {
            s.archivos = s.archivos.filter(a => a.carpetaId === null);
        }
        return s;
    });
    return filteredSeguimiento;
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

    const file = req.file;
    const uploadFile = file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}` : '';

    try {
        const newFile = await prisma.seguimiento.create({
            data:{
                fecha: new Date(),
                archivos: {
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
