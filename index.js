import express from 'express'
import notasRouter from './src/routes/notas.routes.js'


const app = express()

const PORT = 8080

app.use(express.json())
app.use("/create", notasRouter)
app.use("/allNotas", notasRouter)

app.listen(PORT, () =>  { 
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})