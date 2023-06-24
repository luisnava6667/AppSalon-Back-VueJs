import User from '../models/User.js'
import jwt from 'jsonwebtoken'
const authMiddleware = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password -verified -token -__v')
      next()
    } catch {
      const error = new Error('Token no válido ')
      return res.status(403).json({ msg: error.message })
    }
  } else {
    const error = new Error('Token no válido o inexistente')
    return res.status(403).json({ msg: error.message })
  }
}

export default authMiddleware
