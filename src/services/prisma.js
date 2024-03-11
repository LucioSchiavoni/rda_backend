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

export const updateNotaService = async (req, id, updateData) => {
    const file = req.file;
    const uploadFile = file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}` : '';
    const { motivo, estado, observaciones, seguimiento, archivoId } = updateData;
    const idInt = parseInt(id);
    const archivoIdInt = parseInt(archivoId);

    try {
        const data = {
            motivo: motivo || undefined,
            estado: estado || undefined,
            observaciones: observaciones || undefined
        };

        if (file) {
            
            data.seguimiento = {
                update: {
                    where: { id: seguimiento.id }, 
                    data: {
                        archivo: {
                            update: {
                                where: { id: archivoIdInt }, 
                    data: {
                                    ruta: uploadFile
                                }
                            }
                        }
                    }
                }
            };
        }

      
        await prisma.nota.update({
            where: { id: idInt },
            data
        });

        return "Nota actualizada correctamente";
    } catch (error) {
        throw error;
    }
};


