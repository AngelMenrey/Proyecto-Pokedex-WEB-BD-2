import type { Model } from 'mongoose'

export type TypePokemon = {
  id?: string
  typepokemon: string
}

export type TypePokemonModel = Model<TypePokemon>
