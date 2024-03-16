import prisma from "../../config/db.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

const secret = process.env.SECRET_KEY;


export const registerService = async (dataUser) => {
    
    const {username, password, rol} = dataUser;
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
                password: hashPassword,
                rol: rol
            }
        })
        return newUser;
    
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
        return res.status(401).json({ error: 'Usuario no encontrado' });
        }
    const passwordMatch = await bcrypt.compare(password, existUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ 
    id: existUser.id,
    username: existUser.username,
    password: existUser.password,
    rol: existUser.rol
    },
    secret , 
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
        const decodedToken = jwt.verify(token, secret);

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

    res.status(200).json({auth: true})
    } catch (error) {
        console.log("Error de autenticacion: ", error)
    }
}