import Comments from '../models/comment.model'
import { Comment, CommentModel } from '../types/comment.type'
import boom from '@hapi/boom'
class CommentService {
  async create(comment: Comment) {
    const newComment = await Comments.create(comment).catch((error) => {
      console.log('No se guardo comentario', error)
    })
    return newComment
  }
  async findAll() {
    const comments = await Comments.find().catch((error) => {
      console.log('Error al conectarse a la base de datos', error)
    })
    if (!comments) {
      throw boom.notFound('No se encontraron comentarios')
    }
    return comments
  }
}

export default CommentService
