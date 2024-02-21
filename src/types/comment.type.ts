import type { Model } from 'mongoose'

export type Comment = {
  id?: string
  title: string
  description?: string
}

export type CommentModel = Model<Comment>
