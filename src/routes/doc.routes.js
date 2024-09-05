import { createDocController, deleteDocumentController, getDocumentByIdController, getDocumentsByUserIdController, updateDocController } from "../controllers/doc.controller.js";
import { Router } from "express";
import { getDocumentById, getDocumentsByUserId } from "../services/doc/docServices.js";

const docRouter = Router();


docRouter.post("/create/doc", createDocController);
docRouter.put("/update/doc", updateDocController);

//Documento unico
docRouter.get("/docId/:authorId/:id", getDocumentByIdController);

//Todos mis docs
docRouter.get("/docs/:authorId", getDocumentsByUserIdController);
docRouter.delete("/docs/:id", deleteDocumentController);


export default docRouter;