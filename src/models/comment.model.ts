import { Schema, model } from 'mongoose'
import { Comment, CommentModel } from '../types/comment.type'
const Comments = new Schema<Comment, CommentModel>({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
})

export default model('Comment', Comments)
