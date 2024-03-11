import { Router } from "express";
import { createNotas, getNotas } from "../controllers/notas.controller.js";
import upload from "../middlewares/uploadFile.js";


const notasRouter = Router();


notasRouter.post("/create", upload.single('seguimiento[archivo][ruta]') , createNotas)
notasRouter.get("/allNotas", getNotas)

export default notasRouter;