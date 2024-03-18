import express from 'express'
import cors from 'cors'
import notasRouter from './src/routes/notas.routes.js'
import userRouter from './src/routes/user.routes.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
dotenv.config()


const app = express()

const PORT = process.env.PORT

const opcionesCors = {
    origin: process.env.FRONTEND_URL_DEV
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(opcionesCors))
app.use("/", notasRouter)
app.use("/", userRouter)

app.get("/", (req,res) => {
    res.json("Index")
})

app.listen(PORT, () =>  { 
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})