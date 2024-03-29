import express from 'express'
import { Comment } from '../types/comment.type'
import CommentService from '../services/comment.service'
import passport from 'passport'
import { UserRequestType } from '../types/user.type'

const router = express.Router()
const service = new CommentService()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: UserRequestType, res, next) => {
    try {
      const { user } = req
      console.log(user)
      const { id, title, description } = req.query
      let comments
      if (id) {
        comments = await service.findById(id as string)
      } else if (title) {
        comments = await service.findByTitle(title as string)
      } else if (description) {
        comments = await service.findByDescription(description as string)
      } else {
        comments = await service.findAll()
      }
      res.status(200).json(comments)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const comment: Comment = req.body
    const newComment = await service.create(comment)
    res.status(201).json(newComment)
  }
)

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: UserRequestType, res, next) => {
    try {
      const { id, title } = req.query
      let deletedComment
      if (id) {
        deletedComment = await service.deleteById(id as string)
      } else if (title) {
        deletedComment = await service.deleteByTitle(title as string)
      } else {
        throw new Error(
          'Se requiere proporcionar un ID o un título para eliminar un comentario'
        )
      }
      res.status(200).json(deletedComment)
    } catch (error) {
      next(error)
    }
  }
)

export default router
