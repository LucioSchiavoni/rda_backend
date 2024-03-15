import { Router } from "express";
import { createNotas, getNotas, createFile, getNotasById, getSeguimientoById } from "../controllers/notas.controller.js";
import upload from "../middlewares/uploadFile.js";


const notasRouter = Router();


notasRouter.post("/create", upload.single('seguimiento[archivo][ruta]') , createNotas)
notasRouter.get("/allNotas", getNotas)
notasRouter.post("/createFile", upload.single('seguimiento[archivo][ruta]'), createFile)
notasRouter.get("/nota/:id", getNotasById)
notasRouter.get("/seguimiento/:id", getSeguimientoById)

export default notasRouter;