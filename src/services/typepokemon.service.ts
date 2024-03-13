import TypesPokemons from '../models/typepokemon.model'
import { TypePokemon, TypePokemonModel } from '../types/typepokemon.type'
import boom from '@hapi/boom'

class TypePokemonService {
  async create(typepokemon: TypePokemon) {
    try {
      const newTypePokemon = await TypesPokemons.create(typepokemon)
      return newTypePokemon
    } catch (error) {
      console.log('No se guardo el tipo de pokemon', error)
      throw boom.badImplementation('Error al guardar el tipo de pokemon')
    }
  }

  async findAll() {
    try {
      const typespokemons = await TypesPokemons.find()
      if (!typespokemons || typespokemons.length === 0) {
        throw boom.notFound('No se encontraron los tipos de pokemons')
      }
      return typespokemons
    } catch (error) {
      console.log('Error al conectarse a la base de datos', error)
      throw boom.badImplementation('Error al buscar los tipos de pokemons')
    }
  }

  async findById(id: string) {
    try {
      const typepokemon = await TypesPokemons.findById(id)
      if (!typepokemon) {
        throw boom.notFound(`No se encontró un tipo de pokemon con id ${id}`)
      }
      return typepokemon
    } catch (error) {
      console.log(`Error al buscar el tipo de pokemon por id ${id}`, error)
      throw boom.notFound(`No se encontró un tipo de pokemon con id ${id}`)
    }
  }

  async findByTypePokemon(typepokemon: string) {
    try {
      const typespokemons = await TypesPokemons.find({
        typepokemon: typepokemon
      })
      if (!typespokemons || typespokemons.length === 0) {
        throw boom.notFound(`No se encontro el tipo de pokemon ${typepokemon}`)
      }
      return typespokemons
    } catch (error) {
      console.log(
        `Error al buscar el tipo de pokemon por su tipo ${typepokemon}`,
        error
      )
      throw boom.notFound(`No se encontro el tipo de pokemon${typepokemon}`)
    }
  }
}

export default TypePokemonService
