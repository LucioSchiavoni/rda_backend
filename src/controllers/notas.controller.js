import { createNotasService, getNotasService, createFileService, getNotasByIdService, getSeguimientoByIdService, deleteNotaService, updateNotasService } from "../services/prisma.js";
import { pedidoExist } from "../services/validations/prismaValidate.js";



export const createNotas = async(req, res) => {
    const {nro_pedido} = req.body
    const pedido = await pedidoExist(nro_pedido)

    if(pedido){
        return res.status(404).json({error: "Ya existe este numero de pedido"})
    }else{
    try {
        const newNotas = await createNotasService(req, req.body);
        console.log(newNotas)
        res.send({success: "Creacion exitosa"})
    } catch (error) {
        console.log(`Error en la creacion de notas: ${error}`)       
    }

    }
}

export const updateNotas = async(req,res) => {
    const {id} = req.params
    try {
        const update = await updateNotasService( id, req.body);
        res.send({succes: "Nota actualizada correctamente"})
    } catch (error) {
        console.log(error)
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
    const {nro_referencia} = req.params

    try {
        const notaById = await getNotasByIdService(nro_referencia)
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


export const deleteNota = async(req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        await deleteNotaService(id)
        res.json({succes: "Eliminado correctamente"})
    } catch (error) {
        console.log(error)
    }
}