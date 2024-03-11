import { createNotasService, getNotasService } from "../services/prisma.js";
import { pedidoExist, referenciaExist } from "../services/validations/prismaValidate.js";



export const createNotas = async(req, res) => {
    const {nro_pedido, nro_referencia} = req.body
    const pedido = await pedidoExist(nro_pedido)
    const referecia = await referenciaExist(nro_referencia)

    if(pedido){
        res.status(401).json({error: "Ya existe este numero de pedido"})
    }else if(referecia){
        res.status(401).json({error: "Ya existe este numero de referencia"})
    }else{

    try {
        const newNotas = await createNotasService(req, req.body);
        res.status(201).json({success: "Creacion exitosa"})
    } catch (error) {
        console.log(`Error en la creacion de notas: ${error}`)       
    }

    }
}


export const getNotas = async(req, res) => {
    try {
        const notas = await getNotasService();
        res.json(notas)
    } catch (error) {
        console.log(`Error al obtener las notas: ${error}`)
    }
}