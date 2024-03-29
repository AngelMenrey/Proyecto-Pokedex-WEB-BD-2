import Comments from '../models/comment.model'
import { Comment, CommentModel } from '../types/comment.type'
import boom from '@hapi/boom'

class CommentService {
  async create(comment: Comment) {
    const newComment = await Comments.create(comment).catch((error) => {
      console.log(
        'Error al recuperar los comentarios de la base de datos',
        error
      )
    })
    return newComment
  }

  async findAll() {
    const comments = await Comments.find().catch((error) => {
      console.log(
        'Error al recuperar los comentarios de la base de datos',
        error
      )
    })
    if (!comments) {
      throw boom.notFound('No se encontraron comentarios')
    }
    return comments
  }

  async findById(id: string) {
    const comment = await Comments.findById(id).catch((error) => {
      console.log(
        `Error al recuperar el comentario con id ${id} de la base de datos`,
        error
      )
    })
    if (!comment) {
      throw boom.notFound(`No se encontró un comentario con id ${id}`)
    }
    return comment
  }

  async findByTitle(title: string) {
    const comments = await Comments.find({ title: title }).catch((error) => {
      console.log(
        `Error al recuperar el comentario con título ${title} de la base de datos`,
        error
      )
    })
    if (!comments || comments.length === 0) {
      throw boom.notFound(`No se encontró comentario con título ${title}`)
    }
    return comments
  }

  async findByDescription(description: string) {
    const comments = await Comments.find({ description: description }).catch(
      (error) => {
        console.log(
          `Error al recuperar el comentario con la descripción ${description} de la base de datos`,
          error
        )
      }
    )
    if (!comments || comments.length === 0) {
      throw boom.notFound(
        `No se encontró comentario con descripción ${description}`
      )
    }
    return comments
  }

  async deleteById(id: string) {
    const comment = await Comments.findByIdAndDelete(id).catch((error) => {
      console.log(
        `Error al eliminar el comentario con id ${id} de la base de datos`,
        error
      )
      throw boom.badRequest('Error al eliminar el comentario')
    })
    if (!comment) {
      throw boom.notFound(`No se encontró un comentario con id ${id}`)
    }
    return { message: 'Se eliminó correctamente el comentario' }
  }

  async deleteByTitle(title: string) {
    const comment = await Comments.findOneAndDelete({ title: title }).catch(
      (error) => {
        console.log(
          `Error al eliminar el comentario con título ${title} de la base de datos`,
          error
        )
        throw boom.badRequest('Error al eliminar el comentario')
      }
    )
    if (!comment) {
      throw boom.notFound(`No se encontró comentario con título ${title}`)
    }
    return { message: 'Se elimino correctamente el comentario' }
  }
}

export default CommentService
