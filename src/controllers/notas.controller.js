import { createNotasService, getNotasService } from "../services/prisma.js";



export const createNotas = async(req, res) => {
    try {
        const newNotas = await createNotasService(req.body);
        res.status(201).json(newNotas)
    } catch (error) {
        console.log(`Error en la creacion de notas: ${error}`)       
    }
}


export const getNotas = async() => {
    try {
        const notas = await getNotasService();
        res.json(notas)
    } catch (error) {
        console.log(`Error al obtener las notas: ${error}`)
    }
}