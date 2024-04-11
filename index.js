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
    origin: process.env.FRONTEND_URL_DEV,
    credentials: true 
};

app.use(cors(opcionesCors))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/upload", express.static("src/middlewares/upload"))
app.use("/", notasRouter)
app.use("/", userRouter)

app.get("/", (req,res) => {
    res.json("Index")
})

app.listen(PORT, '0.0.0.0', () =>  { 
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`)
})