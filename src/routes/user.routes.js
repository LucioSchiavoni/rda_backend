import { Router } from "express";
import { login, auth, register, changePassword, getAllUser, deleteUser } from "../controllers/user.controller.js";



const userRouter = Router()


userRouter.post("/login", login)
userRouter.get("/auth", auth)
userRouter.post("/register", register)
userRouter.put("/changePassword/:id", changePassword)
userRouter.get("/users", getAllUser)
userRouter.delete("/deleteUser/:id", deleteUser)


export default userRouter;