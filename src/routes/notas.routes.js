import { Router } from "express";
import { createNotas, getNotas } from "../controllers/notas.controller.js";


const notasRouter = Router();


notasRouter.post("/", createNotas)
notasRouter.get("/", getNotas)

export default notasRouter;