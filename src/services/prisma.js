import prisma from "../config/db.js";
import dotenv from 'dotenv'
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


export const createFileService = async (req, dataId) => {

    const { id } = dataId;
    const seguimientoIdInt = parseInt(id) 
    const file = req.file;
    const uploadFile = file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}` : '';
    
    try {

        const seguimientoExistente = await prisma.seguimiento.findFirst({
            where: {
                id: seguimientoIdInt
            }
        })
      
        const newArchivo = await prisma.archivo.create({
            data: {
                destino: seguimientoExistente.destino,
                fecha: new Date(),
                archivo: {
                    create: {
                         ruta: uploadFile,
                        nombre: file ? file.originalname : null,
                    }   
                },
                seguimiento: {connect: {id: seguimientoExistente.id}},
                nota: { connect: { id: seguimientoExistente.notaId.toString } }  
            }
        });
        
        return newArchivo;
    } catch (error) {
        throw error;
    }
};


