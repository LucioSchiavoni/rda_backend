import { Router } from "express";
import { createNotas, getNotas, createFile, getNotasById, getSeguimientoById, deleteNota, updateNotas, downloadFile, getNotaByEstado, createCarpeta, createFileByCarpeta, getArchivosByIdCarpeta, deleteCarpeta, deleteFile, deletePost, addCollaboratorsNotasController, getNotasByPermissionController } from "../controllers/notas.controller.js";
import upload from "../middlewares/uploadFile.js";




const notasRouter = Router();


notasRouter.post("/create" , createNotas)
notasRouter.get("/allNotas", getNotas)
notasRouter.post("/createFile", upload.single('file[url]'), createFile)
notasRouter.get("/post/:id", getNotasById)

notasRouter.get("/seguimiento/:id", getSeguimientoById)
notasRouter.delete("/deleteNota/:id", deleteNota)
notasRouter.put("/updateNota/:id", updateNotas)
notasRouter.get("/download/:id", downloadFile)

notasRouter.get("/nota/estado/:estado", getNotaByEstado)
notasRouter.post("/create/folder", createCarpeta)

notasRouter.post("/create/folder/file", upload.single('file[url]'), createFileByCarpeta)

notasRouter.get("/folder/file/:postId/:folderId", getArchivosByIdCarpeta) 
notasRouter.delete("/delete/folder/:postId/:folderId", deleteCarpeta )
notasRouter.delete("/delete/file/:postId/:fileId", deleteFile)
notasRouter.delete("/delete/post/:postId", deletePost)
notasRouter.post("/collaborators/notas", addCollaboratorsNotasController)
notasRouter.get("/notas/collaborators/:authorId", getNotasByPermissionController)


export default notasRouter;