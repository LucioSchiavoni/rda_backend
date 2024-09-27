import { createNotasService, getNotasService, createFileService, getNotasByIdService, getSeguimientoByIdService, deleteNotaService, updateNotasService, downloadFileService, getNotasByEstadoService, createCarpetaService, createFileByCarpetaService, getArchivosByIdCarpetaService, deleteCarpetaService, deleteFileService, deletePostService, addCollaboratorsNotas, getNotasByPermission } from "../services/prisma.js";



export const createNotas = async (req, res) => {
    
    const { title, content, state, authorId } = req.body;
    try {

            const newNotas = await createNotasService({title, content, state, authorId});
           
            res.send({ success: "Creacion exitosa" });
        
    } catch (error) {
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
        const create = await createFileByCarpetaService(req, req.body)
        res.send({succes: "Creacion del archivo exitoso"})
    } catch (error) {
        console.log(error)
    }
}

export const createCarpeta = async(req,res) => {
    try {
        const {nameFolder, postId} = req.body;

        const create = await createCarpetaService({nameFolder, postId});
        return res.json(create)
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

    const {postId, folderId} = req.params;
 
    try {  
        const response = await getArchivosByIdCarpetaService({postId, folderId});
        res.json(response)
    } catch (error) {
        console.log(error)
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

export const deleteCarpeta = async(req,res) => {
        const {postId, folderId} = req.params
    try {
        const data = await deleteCarpetaService({postId, folderId})
        res.json({succes: "Carpeta borrada con exito"})
    } catch (error) {
        console.log(error)
    }

}

export const deleteFile = async(req,res) => {
    const {postId, fileId} = req.params;

    try {
        const data = await deleteFileService({postId, fileId})
        res.json({success: "Archivo eliminado"})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async(req,res) => {
    const {postId} = req.params;
    try {
        const data = await deletePostService(postId)
        res.json({success: "Repositorio eliminado"})
    } catch (error) {
        console.log(error)
    }
}

export const addCollaboratorsNotasController = async(req,res) => {
    try {
        const data = await addCollaboratorsNotas(req,res)
        return res.json(data);
    } catch (error) {
        console.log(error)
    }
}

export const getNotasByPermissionController = async(req,res) => {
    try {
        const data = await getNotasByPermission(req,res)
         res.json(data)
    } catch (error) {
        console.log(error)
    }
}