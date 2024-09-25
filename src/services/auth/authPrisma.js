import prisma from "../../config/db.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()




export const registerService = async (req,res) => {
    
    const {username, password, rol, name} = req.body;
    try {
        const exist = await prisma.user.findFirst({
            where: {
                username: username
            }
        })
        if(exist){
            return res.json({ error: 'El usuario ya existe' });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword =  bcrypt.hashSync(password, salt)
        const newUser =  await prisma.user.create({
            data:{
                username: username,
                name: name,
                password: hashPassword,
                rolUser: rol
            }
        })
        res.json({success: "Usuario creado con exito"})
        
    } catch (error) {
        console.log("Error del registro: ", error)
    }
}

export const loginService = async (req, res) => {
      const {username, password} = req.body;
    try {
        const existUser = await prisma.user.findUnique({
            where:{
                username:username
            }
        })
        if (!existUser) {
        return res.json({ error: 'Usuario no encontrado' });
        }
    const passwordMatch = await bcrypt.compare(password, existUser.password);
    if (!passwordMatch) {
      return res.json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ 
    id: existUser.id,
    username: existUser.username,
    name: existUser.name,
    password: existUser.password,
    rolUser: existUser.rolUser
    },
    process.env.SECRET_KEY , 
    { expiresIn: '12h' });
        
    res.status(200).json({ token });

    } catch (error) {
        console.log("Error en el login: ", error)
    }
}

export const authService = async (req, res) => {

    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        if (!decodedToken) {
        return res.status(401).json({ error: 'Token inválido' });
    }  
    const userToken = await prisma.user.findUnique({
        where: {
            id: decodedToken.id
        }
    })
    if(!userToken){
        return res.status(401).json({ error: "Usuario no encontrado"})
    }
    
    res.status(200).json({
        id: userToken.id,
        username: userToken.username,
        name: userToken.name,
        rolUser: userToken.rolUser
    })
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Token JWT inválido' });
        }
        console.log("Error de autenticacion: ", error)
    }
}


export const changePasswordService = async(req,res) => {
    const {id} = req.params;
    const {password} = req.body;

    try {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword =  bcrypt.hashSync(password, salt)
            await prisma.user.update({
                where:{
                    id: parseInt(id)
                },
            data:{
                password: hashPassword
            }
        })
        res.json({success: "Contraseña actualizada con éxito"})
    } catch (error) {
        console.log(error)
    }
}


export const getAllUserService = async() => {
    try {
        return await prisma.user.findMany({
            include:{
                posts:true,
                postPermissions:true
            }
        })
    } catch (error) {
        console.log(error)
    }
}


export const deleteUserService = async(req,res) => {

    const {id} = req.params;
   
    try {
        const res = await prisma.user.delete({
            where:{
                id: parseInt(id)
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}