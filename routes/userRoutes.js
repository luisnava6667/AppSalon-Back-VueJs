import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getUSerAppointments } from '../controllers/userController.js'

const router = express.Router()
router.route('/:user/appointments').get(authMiddleware, getUSerAppointments)
export default router
