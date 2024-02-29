import Users from '../models/user.model'
import { User, UserModel } from '../types/user.type'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

class UserService {
  async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await Users.create({
      ...user,
      password: hashedPassword
    }).catch((error) => {
      console.log('No se pudo guardar el usuario', error)
    })

    if (!newUser) {
      throw boom.badRequest('No se pudo crear usuario')
    }
    const lastUserRegistered = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      address: newUser.address,
      phoneNumber: newUser.phoneNumber,
      createdAt: newUser.createdAt,
      lastModified: newUser.lastModified
    }

    return lastUserRegistered
  }
  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) => {
      console.log('No se pudo recuperar la información del usuario', error)
    })

    if (!user) {
      throw boom.notFound('Usuario no encontrado')
    }
    return user
  }
}

export default UserService
