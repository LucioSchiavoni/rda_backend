import { loginService, authService, registerService, changePasswordService } from "../services/auth/authPrisma.js";




export const login  = async (req, res) => {
    try {
        const login = await loginService(req,res)
        return login
    } catch (error) {
        console.log("Error del controlador login: ", error)
    }
}


export const auth = async(req, res) => {
    try {
        const auth = await authService(req,res)
        return auth;
    } catch (error) {
        console.log("Error del controlador auth: ", error)
    }
}

export const register = async(req, res) => {
    try {
        const register = await registerService(req, res)
        return register
    } catch (error) {
        console.log("Error de registro controlador: ", error)
    }
}

export const changePassword = async(req,res) => {
    try {
        const changePassword  = await changePasswordService(req, res)
        return changePassword
    } catch (error) {
        console.log(error)
    }
}