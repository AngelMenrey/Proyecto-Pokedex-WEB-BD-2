//Angel Emanuel Mendoza Reyes - 22110083
//Grupo: 5-P
//Actividad 2 Desarrollo Web y Base de datos 2

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

app.use(express.json())
routerApi(app)

const connectDB = () => {
  mongoose.connect(mongoUri)
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  connectDB()
})

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
