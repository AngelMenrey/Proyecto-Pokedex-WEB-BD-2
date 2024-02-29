import { Schema, model } from 'mongoose'
import { User, UserModel } from '../types/user.type'
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../utils/constants'

const Users = new Schema<User, UserModel>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    match: [
      EMAIL_REGEX,
      'Por favor introduzca una dirección de correo electrónico válida'
    ]
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: [
      PHONE_NUMBER_REGEX,
      'Por favor introduzca un número de teléfono válido'
    ]
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  lastModified: {
    type: Date,
    default: () => Date.now()
  }
})
export default model('User', Users)
