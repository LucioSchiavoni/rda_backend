import { Router } from "express";
import { createNotas, getNotas, createFile, getNotasById, getSeguimientoById, deleteNota, updateNotas, downloadFile, getNotaByEstado, createCarpeta, createFileByCarpeta, getArchivosByIdCarpeta } from "../controllers/notas.controller.js";
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
notasRouter.post("/create/carpeta", createCarpeta)
notasRouter.post("/create/carpeta/file", upload.single('file[url]'), createFileByCarpeta)
notasRouter.get("/carpeta/archivos", getArchivosByIdCarpeta) //es redundante, con la ruta de  seguimiento/:id  devuelve todo

export default notasRouter;