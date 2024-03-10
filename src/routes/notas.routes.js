import { Router } from "express";
import { createNotas, getNotas } from "../controllers/notas.controller.js";


const notasRouter = Router();


notasRouter.post("/create", createNotas)
notasRouter.get("/allNotas", getNotas)

export default notasRouter;