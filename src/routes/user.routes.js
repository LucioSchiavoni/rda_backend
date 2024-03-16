import { Router } from "express";
import { login, auth, register } from "../controllers/user.controller.js";



const userRouter = Router()


userRouter.post("/login", login)
userRouter.get("/auth", auth)
userRouter.post("/register", register)

export default userRouter;