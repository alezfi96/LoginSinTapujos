import express  from "express"
import  personaRoutes from './routes/personas.routes.js'
import indexRoutes from './routes/index.routes.js'
import cors from "cors"


const app = express()


app.use(express.json())

app.use('/',indexRoutes)
app.use('/api',personaRoutes)

app.use((req,res,next)=>{
    res.status(404).json({
        message:'endpoint no funcioa'
    })
})

app.use(cors())

export default app;