import express from 'express'
import passport from 'passport'
import UserService from '../services/user.service'
import { UserRequestType as RequestType } from '../types/user.type'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'

const router = express.Router()
const service = new UserService()

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req: RequestType, res, next) => {
    try {
      const { user } = req
      const payload = { sub: user.id }
      const token = jwt.sign(payload, config.jwtSecret)
      const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        lastModified: user.lastModified
      }
      console.log({ payload })
      res.status(200).json({ userInfo, token })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

export default router
