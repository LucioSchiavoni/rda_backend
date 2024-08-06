import { createDocService } from "../services/doc/docServices.js";


export const createDocController = async(req,res) => {
    try {
        const result = await createDocService(req,res)
        return res.json(result)
    } catch (error) {
        console.log(error)
    }
}