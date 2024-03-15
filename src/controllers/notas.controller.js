import { createNotasService, getNotasService, createFileService, getNotasByIdService, getSeguimientoByIdService } from "../services/prisma.js";
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

export const getNotasById = async (req, res) => {
    const {id} = req.params

    try {
        const notaById = await getNotasByIdService(id)
        res.json(notaById)
       
    } catch (error) {
        console.log("Error al obtener la nota por id: " ,error)
    }
}

export const createFile = async (req, res) => {
    try {
        const updateFile = await createFileService(req, req.body)
        res.json({succes: "Se creo el archivo correctamente!"})
    } catch (error) {
        console.log(error)
    }
}

export const getSeguimientoById = async(req, res) => {
    const {id} = req.params
    try {
        const seguimiento = await getSeguimientoByIdService(id)
        res.json(seguimiento)
    } catch (error) {
        console.log("Error al obtener el seguimiento de la nota: ", error)
    }
}
