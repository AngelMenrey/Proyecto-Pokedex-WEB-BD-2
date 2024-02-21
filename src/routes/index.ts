import express from 'express'
import CommentRouter from './comment.route'
const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/comments', CommentRouter)
}
export default routerApi
