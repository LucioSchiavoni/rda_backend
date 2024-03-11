import { Router } from "express";
import { createNotas, getNotas, updateNotas } from "../controllers/notas.controller.js";
import upload from "../middlewares/uploadFile.js";


const notasRouter = Router();


notasRouter.post("/create", upload.single('seguimiento[archivo][ruta]') , createNotas)
notasRouter.get("/allNotas", getNotas)
notasRouter.put("/updateNota", upload.single('seguimiento[archivo][ruta]'), updateNotas)

export default notasRouter;