import prisma from "../config/db.js";
import dotenv from 'dotenv'
import { destinoId } from "./validations/prismaValidate.js";
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