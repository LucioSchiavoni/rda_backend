import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const createNotasService = async (dataNotas) => {
const {seguimiento, ...notaData} = dataNotas;

        const newSeguimiento =  await prisma.nota.create({
            data: seguimiento
            
        })

        const newNotas = await prisma.nota.create({
            data: {
                ...notaData,
                seguimiento: {
                    connect: {
                        id: newSeguimiento.id
                    }
                }
            }
        })

        return newNotas;
     
}

export const getNotasService = async () => {
    return await prisma.nota.findMany()
}

export default prisma;