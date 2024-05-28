import { createNotasService, getNotasService, createFileService, getNotasByIdService, getSeguimientoByIdService, deleteNotaService, updateNotasService, downloadFileService, getNotasByEstadoService, createCarpetaService, createFileByCarpetaService, getArchivosByIdCarpetaService } from "../services/prisma.js";



export const createNotas = async (req, res) => {

    try {
            const newNotas = await createNotasService(req, res);
            console.log(newNotas);
            res.send({ success: "Creacion exitosa" });
        
    } catch (error) {
        // handleError(res, error);
        console.log(error)
    }
};

export const updateNotas = async(req,res) => {
    const {id} = req.params
    try {
        const update = await updateNotasService( id, req.body);
        res.send({succes: "Nota actualizada correctamente"})
    } catch (error) {
        console.log(error)
    }
}

export const createFileByCarpeta = async(req, res) =>{
    try {
        console.log("datos", req.body)
        const create = await createFileByCarpetaService(req, req.body)
        res.send({succes: "Creacion del archivo exitoso"})
    } catch (error) {
        console.log(error)
    }
}

export const createCarpeta = async(req,res) => {
    try {
        console.log("nombre de carpeta: ",req.body)
        const create = await createCarpetaService(req.body);
        res.send({succes: "Carpeta creada correctamente"})
    } catch (error) {
        console.log(error)
    }
}


export const getNotas = async(req, res) => {
    try {
        const notas = await getNotasService();
        return res.json(notas)
    } catch (error) {
        console.log(`Error al obtener las notas: ${error}`)
    }
}

export const getArchivosByIdCarpeta = async(req, res) => {
    try {
        const response = await getArchivosByIdCarpetaService(req.body);
        res.json(response)
    } catch (error) {
        console.log(error)
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

export const downloadFile = async(req, res) =>{

    try {
        await downloadFileService(req,res)
        
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


export const getNotaByEstado = async(req,res) => {
    const {estado} = req.params
    try {
       const data = await getNotasByEstadoService(estado)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}