import { Schema, model } from 'mongoose'
import { TypePokemon, TypePokemonModel } from '../types/typepokemon.type'
export const TYPE_POKEMON_REFERENCE = 'TypePokemon'

const TypesPokemons = new Schema<TypePokemon, TypePokemonModel>({
  typepokemon: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  }
})

export default model(TYPE_POKEMON_REFERENCE, TypesPokemons)
