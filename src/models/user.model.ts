import { Schema, model } from 'mongoose'
import { User, UserMethods, UserModel } from '../types/user.type'
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../utils/constants'

const Users = new Schema<User, UserModel, UserMethods>({
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
    match: [EMAIL_REGEX, 'Por favor ingrese un correo electrónico valido']
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
      'Por favor ingrese un numero de telefono valido'
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

Users.methods.toClient = function () {
  return {
    id: this._id as unknown as string,
    name: this.name,
    email: this.email,
    address: this.address,
    phoneNumber: this.phoneNumber
  }
}

export default model('User', Users)
