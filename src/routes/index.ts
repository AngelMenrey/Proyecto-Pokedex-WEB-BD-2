import express from 'express'
import CommentRouter from './comment.route'
import UserRouter from './user.route'
import AuthRouter from './auth.route'
import PokemonRouter from './pokemon.route'
import TypePokemonRouter from './typepokemon.route'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/comments', CommentRouter)
  router.use('/users', UserRouter)
  router.use('/auth', AuthRouter)
  router.use('/pokemons', PokemonRouter)
  router.use('/typespokemons', TypePokemonRouter)
}
export default routerApi
