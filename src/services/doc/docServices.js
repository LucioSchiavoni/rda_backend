import prisma from "../../config/db.js";



export const createDocService = async(req,res) => {

    const {description, title, authorId} = req.body;
    try {
        const createDoc =  await prisma.document.create({
            data:{
                title: title,
                authorId: parseInt(authorId),
                description: description
            }
        })
        return { success: "Documento creado"}
    } catch (error) {
        console.log(error)
    }
}

//Actualizar documento
const findDocById = async(id) => {
    try {
        return await prisma.document.findUnique({where:{id: parseInt(id)}})
    } catch (error) {
        console.log(error)
    }
}

export const updateDocumentService = async(req,res) => {
    const {id, description, title, authorId} = req.body;
    const documentData = await findDocById(id);
    try {
        const updateDoc = await prisma.document.update({
            where:{
                id: parseInt(id),
                authorId: parseInt(authorId)
            },
            data:{
                description: description,
                title: !title ? documentData.title : title
            }
        })
        return {success: "Se guardaron los cambios"}
    } catch (error) {
        console.log(error)
    }
}


//ver todos mis documentos creados
export const getDocumentsByUserId = async (req, res) => {
    const { authorId } = req.params;
    try {
        const documentsByAuthor = await prisma.document.findMany({
            where: {
                authorId: parseInt(authorId)
            }
        });

        const documentsByCollaborator = await prisma.document.findMany({
            where: {
                collaborators: {
                    some: {
                        userId: parseInt(authorId)
                    }
                }
            }
        });

        const allDocuments = [
            ...documentsByAuthor,
            ...documentsByCollaborator
        ];
          
        const uniqueDocuments = Array.from(new Set(allDocuments.map(doc => doc.id)))
            .map(id => {
                return allDocuments.find(doc => doc.id === id);
            });

        return res.json(uniqueDocuments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener documentos' });
    }
};



//entrar al contenido del documento por su id
export const getDocumentById = async(req,res) => {
    const {id, authorId} = req.params;
    try {
        const result = await prisma.document.findFirst({
            where:{
                id: parseInt(authorId),
                
            }
        })
        return result
    } catch (error) {
        console.log(error)
    }
}


export const deleteDocumentService = async(req,res) => {
    const {id} = req.params;
    try {
        const res = await prisma.document.delete({
            where:{id: parseInt(id)}
        })
        return {success: "Documento eliminado"}
    } catch (error) {
        console.log(error)
    }
}

export const addCollaborators = async(req,res) => {
    const {userId, documentId} = req.body;
    try {
        const findName = await prisma.user.findUnique({where:{id:userId}})
        const findCollab = await prisma.collaborators.findFirst(
            {

                where:{
                    userId: userId,
                    documentId: documentId
                }
            }
        )
        if(findCollab){
            return {info: "El usuario ya es colaborador de este documento"}
        }
        const res = await prisma.collaborators.create({
            data:{
                userId: userId,
                documentId: documentId,
                name: findName.name
            }
        })
        return {info: "Se agrego un nuevo colaborador"}
    } catch (error) {
        console.log(error)
    }
}