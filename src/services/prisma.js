import prisma from "../config/db.js";
import dotenv from 'dotenv'



dotenv.config()


export const createNotasService = async (data) => {

    const { content, authorId, title, state  } = data;

    const newNotas = await prisma.post.create({
        data: {
            title: title,
            content: content,
            authorId: parseInt(authorId),
            state: state,
            permissions:{
                create:{
                    userId: authorId,
                    permission: "WRITE"
                }
            },
            
        }

    });
    return newNotas;
};


export const createCarpetaService = async (dataCarpetas) => {
    
    const {nameFolder, postId} = dataCarpetas;
      
    const findFolder = await prisma.folder.findFirst({
        where:{
            nameFolder: nameFolder
        }
    })
    if(findFolder){
        return {message: "Ya existe la carpeta"} 
    }
    const newCarpeta = await prisma.folder.create({
        data:{
            nameFolder: nameFolder,
            postId: postId
        }
    })
    return { message: "Carpeta creada con exito"};
}

export const deleteCarpetaService = async(data) => {

    const {postId, folderId} = data;

    const deleteFolder = await prisma.folder.delete({
        where:{
            id: parseInt(folderId),
            postId: parseInt(postId) 
        }
    })
    return deleteFolder;
}



export const createFileByCarpetaService = async(req, dataFile) => {
    try {
    const {folderId, postId} = dataFile;
    const file = req.file;
    const uploadFile = file ? `${process.env.URL_UPLOAD}/upload/${file.filename}` : '';

    const findFolder = await prisma.folder.findUnique({
        where:{
            id: parseInt(folderId)
        }
    })
    if(!findFolder){
        return res.json({error: "No se encuentra la carpeta"})
    }
    const newFile = await prisma.file.create({
            data:{
                url: uploadFile,
                nameFile: file ? file.originalname : null, 
                folder:{
                    connect: {id: parseInt(folderId)}
                },
                post:{
                    connect: {id: parseInt(postId) }
                }
            }
    })
    return newFile;
    } catch (error) {
        console.log(error)
    }
 
}


export const getArchivosByIdCarpetaService = async (data) => {
    const { postId, folderId } = data;
    try {
        const archivosByCarpeta = await prisma.file.findMany({
            where: {
                postId: parseInt(postId),
                folder:{
                    id:parseInt(folderId)
                },
                folderId:{
                    not: null
                }
            }
            });
           
        return archivosByCarpeta;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener archivos por carpeta');
    }
};


export const getNotasByEstadoService = async (estado) =>  {
    try {
        const nota = await prisma.nota.findMany({
            where: {
                estado: estado
            }
           
        })
        return nota;
    } catch (error) {
        console.log(error)
    }
}


export const addCollaboratorsNotas = async(req,res) => {

    const { userId, postId, permission} = req.body;
    try {
        const existPermission  = await prisma.postPermission.findFirst({
            where:{
                postId: parseInt(postId),
                userId: parseInt(userId)
            }
        })
        if(existPermission){
            return {info: "Este usuario ya tiene permisos"}
        }
        const permissionData = await prisma.postPermission.create({
            data:{
                userId: parseInt(userId),
                postId: parseInt(postId),
                permission: permission
            }
        })
        return {info: "Se agrego un colaborador a este post"}
    } catch (error) {
        console.log(error)
    }
}

export const getNotasByPermission = async (req, res) => {
    const { authorId } = req.params;
    try {
        const postByAuthor = await prisma.post.findMany({
            where: {
                authorId: parseInt(authorId)
            },
            include:{
                author:true,
                folder:true,
                file:true,
                permissions:true
            }
        });

        const postByCollaborator = await prisma.post.findMany({
            where: {
                permissions: {
                    some: {
                        userId: parseInt(authorId)
                    }
                }
            },
            include:{
                author:true,
                file:true,
                folder:true,
                permissions:true
            }
        });

        const postPublic = await prisma.post.findMany({
            where:{
                state:"PUBLIC"
            },
            include:{
                author:true,
                file:true,
                folder:true,
                permissions:true
            }
        })

        const allPost = [
            ...postByAuthor,
            ...postByCollaborator,
            ...postPublic
        ];
          
        const uniquePost = Array.from(new Set(allPost.map(post => post.id)))
            .map(id => {
                return allPost.find(post => post.id === id);
            });

        return res.json(uniquePost);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener documentos' });
    }
};



export const downloadFileService = async (req, res) => {

    try {
        const { id } = req.params;
        const existFile = await prisma.file.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existFile) {
            console.log("Archivo no encontrado");
            return res.status(404).send("Archivo no encontrado");
        }
        
        const fileUrl = existFile.url;
        const rutaLocalRelativa = fileUrl.replace(/^.*\/\/[^\/]+/, '');
        const rutaEnPC = `src/middlewares${rutaLocalRelativa}`;
        
        res.download(rutaEnPC);
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
        res.status(500).send("Error al descargar el archivo");
    }
}

export const updateNotasService = async( dataNotas) => {
    
    const { id, title, content} = dataNotas
    const parseId = parseInt(id)
    try {
        const existingNota = await prisma.post.findUnique({
            where: {
                id: parseId
            },
            });
    
        if (!existingNota) {
            throw new Error('Nota no encontrada');
        }

        const updateData = {};

        if (title !== undefined) {
            updateData.title = title;
        }
        if (content !== undefined) {
            updateData.content = content;
        }
                await prisma.post.update({
                    data:{
                        content: post.content,
                        title: post.title,
                        updatedAt: new Date(),
                        file: {
                            create:{
                                url:file.file.url,
                                fileName: file.file.fileName
                            }
                        },
                        post: {connect: {id: parseId}}, 
                    
                    }
                })
            }
            
       
    catch (error) {
        return    console.log(error)
    }
        
}

export const getNotasService = async () => {
    try {
      return await prisma.post.findMany({
      include:{
        author:true,
        folder: {
            include:{
                file:true
            }
        },
        file:{where: {folderId:null}}

      }

    }); 

    } catch (error) {
       console.log(error)
    }
}

export const getSeguimientoByIdService = async(id) => {

    const idInt = parseInt(id)
    const findPost =  await prisma.post.findMany({
        where: {
            postId: idInt
        },
        include: {
            file: true,
            folder:{
                include:{
                    file: true
                }
            }
        }
    })  
     const filteredSeguimiento = findPost.map(s => {
        if (s.folder.some(c => c.archivos.length > 0)) {
            s.file = s.file.filter(a => a.folderId === null);
        }
        return s;
    });
    return filteredSeguimiento;
}

export const getNotasByIdService = async (id) => {

    const idInt = parseInt(id)
    return await prisma.post.findFirst({
        where: {
            id: idInt
        },
        include : {
            file:{ where:{folderId: null}},
            folder: {
                include:{
                    file:true
                }
            },
            permissions:true,
            author:true
        }
    })
}

export const createFileService = async(req, notaId) => {

    const {id} = notaId;


    const file = req.file;
    const uploadFile = file ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}` : '';

    try {
        const newFile = await prisma.file.create({
            data:{
            url: uploadFile,
            nameFile: file ? file.originalname : null,
            postId: parseInt(id), 
            }

        })
        return newFile;
    } catch (error) {
        console.log("Error al crear nuevo archivo: ", error)
    }
}


export const deleteNotaService = async(notaId) => {
    const idInt = parseInt(notaId)
  
    try {
        await prisma.post.deleteMany({
            where:{
                id:idInt
            }
        })

    return { success: "Nota eliminada correctamente" };
    } catch (error) {
        console.log(error)
    }
}


export const deleteFileService = async(data) => {
        const {postId, fileId} = data;
    try {
        await prisma.file.delete({
         where:{
            id: parseInt(fileId),
            postId: parseInt(postId)
         }
        })
        return {success: "Archivo eliminado"};    
    } catch (error) {
        console.log(error)
    }
}

export const deletePostService = async(id) => {

    const idInt = parseInt(id)    

    try {
        return await prisma.post.delete({
            where:{
              id: idInt
            }
        })
    } catch (error) {
        console.log(error)
    }
}