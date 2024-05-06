//Angel Emanuel Mendoza Reyes - 22110083
//Grupo: 5-P
//Proyecto Desarrollo Web y Base de datos 2 - Pokedéx

import express from 'express'
import mongoose from 'mongoose'
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler'
import routerApi from './routes'
import { config } from './config/config'
import passport from 'passport'
import './utils/auth'
import cors from 'cors'

const { mongoUri, port } = config
const app = express()

app.use(passport.initialize())
app.use(express.json())
app.use(cors())
routerApi(app)

const connectDB = () => {
  mongoose.connect(mongoUri)
}

app.listen(port, () => {
  console.log(`Escuchando en el http://localhost:${port}`)
  connectDB()
})

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
