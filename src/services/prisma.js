import prisma from "../config/db.js";
import dotenv from 'dotenv'
import { destinoId } from "./validations/prismaValidate.js";
dotenv.config()


export const createNotasService = async (req, dataNotas) => {
    
    const file = req.file
    const uploadFile = file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}`: '';

    const {nro_referencia, motivo, nro_pedido, estado, observaciones, seguimiento} = dataNotas;

    const referenciaInt = parseInt(nro_referencia)
    const pedidoInt = parseInt(nro_pedido)

    const newNotas = await prisma.nota.create({
        data: {
           nro_referencia: referenciaInt,
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

export const getSeguimientoByIdService = async(id) => {

    const idInt = parseInt(id)
    return await prisma.seguimiento.findMany({
        where: {
            notaId: idInt
        },
        include: {
            archivo: true
        }
    })
}

export const getNotasByIdService = async (id) => {

    const idInt = parseInt(id)
    return await prisma.nota.findFirst({
        where: {
            id: idInt
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

    const {id} = notaId;

    const idInt = parseInt(id)
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
                        id: idInt
                    }
                }
            }
        })
        return newFile;
    } catch (error) {
        console.log("Error al crear nuevo archivo: ", error)
    }
}