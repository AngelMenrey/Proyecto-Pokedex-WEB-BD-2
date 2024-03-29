import express from 'express'
import { TypePokemon } from '../types/typepokemon.type'
import TypePokemonService from '../services/typepokemon.service'
import passport from 'passport'
import { UserRequestType } from '../types/user.type'
import boom from '@hapi/boom'

const router = express.Router()
const service = new TypePokemonService()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: UserRequestType, res, next) => {
    try {
      if (req.query.typepokemon) {
        const { typepokemon } = req.query
        const typespokemons = await service.findByTypePokemon(
          typepokemon as string
        )
        return res.status(200).json(typespokemons)
      }

      if (req.query.id) {
        const { id } = req.query
        const typepokemon = await service.findById(id as string)
        return res.status(200).json(typepokemon)
      }

      const typespokemons = await service.findAll()
      res.status(200).json(typespokemons)
    } catch (error) {
      console.error('Error:', error)
      next(boom.boomify(error))
    }
  }
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const typepokemon: TypePokemon = req.body
      const newTypePokemon = await service.create(typepokemon)
      res.status(201).json(newTypePokemon)
    } catch (error) {
      console.error('Error:', error)
      next(boom.boomify(error))
    }
  }
)

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: UserRequestType, res, next) => {
    try {
      const { id, typepokemon } = req.query
      if (id) {
        const message = await service.deleteById(id as string)
        res.status(200).json({ message })
      } else if (typepokemon) {
        const message = await service.deleteByTypePokemon(typepokemon as string)
        res.status(200).json({ message })
      } else {
        throw boom.badRequest(
          'Se requiere proporcionar un ID o un tipo de pokemon para eliminar'
        )
      }
    } catch (error) {
      console.error('Error:', error)
      if (error.isBoom) {
        next(error)
      } else {
        next(boom.internal('Error interno del servidor'))
      }
    }
  }
)

export default router
