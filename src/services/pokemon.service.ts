import Pokemons from '../models/pokemon.model'
import { Pokemon, PokemonModel } from '../types/pokemon.type'
import boom from '@hapi/boom'
import TypesPokemons from '../models/typepokemon.model'

class PokemonService {
  async create(pokemon: Pokemon) {
    try {
      const typePokemon = await TypesPokemons.findById(pokemon.typepokemon)
      if (!typePokemon) {
        throw boom.notFound(
          `No se encontró un tipo de pokemon con id ${pokemon.typepokemon}`
        )
      }
      pokemon.typepokemon = typePokemon
      const newPokemon = await Pokemons.create(pokemon)
      return newPokemon
    } catch (error) {
      console.log('No se guardo el pokemon', error)
      throw boom.badImplementation('Error al guardar el pokemon')
    }
  }

  async findAll() {
    try {
      const pokemons = await Pokemons.find().populate('typepokemon')
      if (!pokemons || pokemons.length === 0) {
        throw boom.notFound('No se encontraron pokemons')
      }
      return pokemons
    } catch (error) {
      console.log('Error al conectarse a la base de datos', error)
      throw boom.badImplementation('Error al buscar pokemons')
    }
  }

  async findById(id: string) {
    try {
      const pokemon = await Pokemons.findById(id).populate('typepokemon')
      if (!pokemon) {
        throw boom.notFound(`No se encontró un pokemon con id ${id}`)
      }
      return pokemon
    } catch (error) {
      console.log(`Error al buscar pokemon por id ${id}`, error)
      throw boom.notFound(`No se encontró un pokemon con id ${id}`)
    }
  }

  async findByName(name: string) {
    try {
      const pokemons = await Pokemons.find({ name: name }).populate(
        'typepokemon'
      )
      if (!pokemons || pokemons.length === 0) {
        throw boom.notFound(`No se encontro pokemon con el nombre ${name}`)
      }
      return pokemons
    } catch (error) {
      console.log(`Error al buscar el pokemon por nombre ${name}`, error)
      throw boom.notFound(`No se encontro el pokemon con el nombre ${name}`)
    }
  }

  async findByAttackLevel(attackLevel: string) {
    try {
      const pokemons = await Pokemons.find({
        attackLevel: attackLevel
      }).populate('typepokemon')
      if (!pokemons || pokemons.length === 0) {
        throw boom.notFound(
          `No se encontro pokemon con nivel de ataque ${attackLevel}`
        )
      }
      return pokemons
    } catch (error) {
      console.log(
        `Error al buscar el pokemon por nivel de ataque ${attackLevel}`,
        error
      )
      throw boom.notFound(
        `No se encontro el pokemon con nivel de ataque ${attackLevel}`
      )
    }
  }

  async findByTypePokemonId(typepokemonId: string) {
    try {
      const pokemons = await Pokemons.find({
        typepokemon: typepokemonId
      }).populate('typepokemon')
      if (!pokemons || pokemons.length === 0) {
        throw boom.notFound(
          `No se encontro pokemon con el tipo de pokemon de id ${typepokemonId}`
        )
      }
      return pokemons
    } catch (error) {
      console.log(
        `Error al buscar el pokemon por id de tipo de pokemon ${typepokemonId}`,
        error
      )
      throw boom.notFound(
        `No se encontro el pokemon con el tipo de pokemon de id ${typepokemonId}`
      )
    }
  }

  async findByTypePokemonName(typepokemon: string) {
    try {
      const typePokemon = await TypesPokemons.findOne({
        typepokemon: typepokemon
      })
      if (!typePokemon) {
        throw boom.notFound(
          `No se encontró un tipo de pokemon con el nombre ${typepokemon}`
        )
      }
      const pokemons = await Pokemons.find({
        typepokemon: typePokemon._id
      }).populate('typepokemon')
      if (!pokemons || pokemons.length === 0) {
        throw boom.notFound(
          `No se encontro el pokemon con el tipo de pokemon ${typepokemon}`
        )
      }
      return pokemons
    } catch (error) {
      console.log(
        `Error al buscar el pokemon por su tipo ${typepokemon}`,
        error
      )
      throw boom.notFound(
        `No se encontro el pokemon con el tipo de pokemon ${typepokemon}`
      )
    }
  }

  async deleteById(id: string) {
    try {
      const pokemon = await Pokemons.findByIdAndDelete(id)
      if (!pokemon) {
        throw boom.notFound(`No se encontró un pokemon con id ${id}`)
      }
      return 'Se eliminó correctamente el pokemon'
    } catch (error) {
      console.error('Error al eliminar el pokemon por id', error)
      throw boom.badImplementation('Error al eliminar el pokemon')
    }
  }

  async deleteByName(name: string) {
    try {
      const pokemon = await Pokemons.findOneAndDelete({ name })
      if (!pokemon) {
        throw boom.notFound(`No se encontró un pokemon con nombre ${name}`)
      }
      return 'Se eliminó correctamente el pokemon'
    } catch (error) {
      console.error('Error al eliminar el pokemon por nombre', error)
      throw boom.badImplementation('Error al eliminar el pokemon')
    }
  }
}

export default PokemonService
