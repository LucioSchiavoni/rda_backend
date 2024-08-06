import prisma from "../../config/db.js";



export const createDocService = async(req,res) => {

     const {description, title, authorId} = req.body;

    try {
        const createDoc =  await prisma.document.create({
            data:{
                title: title,
                authorId: authorId,
                description: description
            }
        })
        return { success: "Documento creado"}
    } catch (error) {
        console.log(error)
    }
}

