import express from 'express'
import notasRouter from './src/routes/notas.routes.js'


const app = express()

const PORT = 8080

app.use(express.json())
app.use("/", notasRouter)
app.use("/", notasRouter)

app.listen(PORT, () =>  { 
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})