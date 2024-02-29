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
      const comments = await service.findAll()
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

export default router
