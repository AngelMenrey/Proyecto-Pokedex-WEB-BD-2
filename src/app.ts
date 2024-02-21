import express from 'express'
import mongoose from 'mongoose'
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler'
import routerApi from './routes'
import { config } from './config/config'
const { mongoUri, port } = config
const app = express()

//Middlewares
app.use(express.json())
routerApi(app)
//Conexion a la Base de datos
const connectDB = () => {
  mongoose.connect(mongoUri)
}
//Escuchando el puerto
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  connectDB()
})
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
