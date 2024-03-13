import { Schema, model } from 'mongoose'
import { Pokemon, PokemonModel } from '../types/pokemon.type'
import { TYPE_POKEMON_REFERENCE } from './typepokemon.model'
export const POKEMON_REFERENCE = 'Pokemon'

const Pokemons = new Schema<Pokemon, PokemonModel>({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  attackLevel: {
    type: String,
    required: true,
    trim: true
  },
  typepokemon: {
    type: Schema.Types.ObjectId,
    ref: TYPE_POKEMON_REFERENCE
  }
})

export default model(POKEMON_REFERENCE, Pokemons)
