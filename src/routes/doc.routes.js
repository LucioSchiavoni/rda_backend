import { createDocController } from "../controllers/doc.controller.js";
import { Router } from "express";

const docRouter = Router();


docRouter.post("/create/doc", createDocController);


export default docRouter;