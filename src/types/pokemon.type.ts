import type { Model } from 'mongoose'
import { TypePokemon } from './typepokemon.type'

export type Pokemon = {
  id?: string
  name: string
  attackLevel?: string
  typepokemon: TypePokemon
}

export type PokemonModel = Model<Pokemon>
