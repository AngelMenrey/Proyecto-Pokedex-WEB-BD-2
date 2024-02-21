import express from 'express'
import { Comment } from '../types/comment.type'
import CommentService from '../services/comment.service'

const router = express.Router()
const service = new CommentService()

//Metodo GET
router.get('/', async (req, res, next) => {
  try {
    const comments = await service.findAll()
    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
})
//Metodo POST
router.post('/', async (req, res) => {
  const comment: Comment = req.body
  const newComment = await service.create(comment)
  res.status(201).json(newComment)
})

export default router
