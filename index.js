import express from 'express'
import notasRouter from './src/routes/notas.routes.js'
import dotenv from 'dotenv'
dotenv.config()


const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use("/", notasRouter)



app.listen(PORT, () =>  { 
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})