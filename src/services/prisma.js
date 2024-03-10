import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient({
    datasources:{
        db:{
            url: process.env.DATABASE_URL
        }
    }
});

export const createNotasService = async (dataNotas) => {

    const {nro_referencia, motivo, nro_pedido, estado, observaciones, seguimiento} = dataNotas;

    const newNotas = await prisma.nota.create({
        data: {
            nro_referencia,
            motivo,
            nro_pedido,
            estado,
            observaciones,
            seguimiento: {
                create:{
                    destino:
                    seguimiento.destino,
                    archivo:{
                        create:{
                            ruta: seguimiento.archivo.ruta,
                            nombre: seguimiento.archivo.nombre
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

export default prisma;