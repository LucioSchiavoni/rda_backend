import { addCollaborators, createDocService, deleteDocumentService, getDocumentById, getDocumentsByUserId, updateDocumentService } from "../services/doc/docServices.js";


export const createDocController = async(req,res) => {
    try {
        const result = await createDocService(req,res)
        return res.json(result)
    } catch (error) {
        console.log(error)
    }
}


export const updateDocController = async(req,res) => {
    try {
        const result = await updateDocumentService(req,res)
        return res.json(result)
    } catch (error) {
        console.log(error)
    }
}

export const getDocumentsByUserIdController = async(req,res) => {
    try {
        const result = await getDocumentsByUserId(req,res)
        return res.json(result)
    } catch (error) {
        console.log(error)
    }
}

export const getDocumentByIdController = async(req,res) => {
    try {
        const result = await getDocumentById(req,res)
        return res.json(result)
    } catch (error) {
        console.log(error)
    }
}


export const deleteDocumentController = async(req,res) => {
    try {
        const result = await deleteDocumentService(req,res)
        return res.json(result)
    } catch (error) {
        console.log(error)
    }
}


export const addCollaboratorsControllers = async(req,res) => {
    try {
        const result = await addCollaborators(req,res)
        return res.json(result)
    } catch (error) {
        console.log(error)
    }
}