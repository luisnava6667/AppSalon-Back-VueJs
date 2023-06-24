import express from 'express'
import {
  login,
  register,
  user,
  verifyAccount,
  forgotPassword,
  verifyPasswordResetToken,
  updatePassword,
  admin
} from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router
  .route('/forgot-password/:token')
  .get(verifyPasswordResetToken)
  .post(updatePassword)

router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)

export default router
