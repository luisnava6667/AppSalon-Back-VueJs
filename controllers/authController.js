import User from '../models/User.js'
import {
  sendEmailVerification,
  sendEmailPasswordReset
} from '../emails/authEmailService.js'
import { generateJWT, uniqueId } from '../utils/index.js'

const register = async (req, res) => {
  if (Object.values(req.body).includes('')) {
    const error = new Error('Por favor rellene todos los campos')
    return res.status(400).json({ msg: error.message })
  }
  const { email, password, name } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    const error = new Error('El usuario ya esta registrado')
    return res.status(400).json({ msg: error.message })
  }
  const MIN_PASSWORD_LENGTH = 8
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`
    )
    return res.status(400).json({ msg: error.message })
  }
  try {
    const user = new User(req.body)
    const result = await user.save()
    const { name, email, token } = result
    sendEmailVerification({
      name,
      email,
      token
    })
    res
      .status(200)
      .json({ msg: 'Usuario creado correctamente, revisa tu email' })
  } catch (error) {
    console.log(error)
  }
}
const verifyAccount = async (req, res) => {
  const { token } = req.params
  const user = await User.findOne({ token })
  if (!user) {
    const error = new Error('Hubo un error, token no válido')
    return res.status(401).json({ msg: error.message })
  }
  try {
    user.verified = true
    user.token = ''
    await user.save()
    res.status(200).json({ msg: 'Usuario confirmado correctamente' })
  } catch (error) {
    console.log(error)
  }
}
const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('El usuario no existe')
    return res.status(401).json({ msg: error.message })
  }
  if (!user.verified) {
    const error = new Error('El usuario no ha confirmado su cuenta')
    return res.status(401).json({ msg: error.message })
  }
  if (await user.checkPassword(password)) {
    const token = generateJWT(user._id)

    res.json({ token })
  } else {
    const error = new Error('La contraseña es incorrecta')
    return res.status(401).json({ msg: error.message })
  }
}
const forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({ msg: error.message })
  }
  try {
    user.token = uniqueId()
    const result = await user.save()
    await sendEmailPasswordReset({
      name: result.name,
      email: result.email,
      token: result.token
    })

    res.json({ msg: 'Revisa tu email para cambiar la contraseña' })
  } catch (error) {
    console.log(error)
  }
}
const user = async (req, res) => {
  const { user } = req
  res.json(user)
}
const verifyPasswordResetToken = async (req, res) => {
  const { token } = req.params
  const isValidToken = await User.findOne({ token })
  if (!isValidToken) {
    const error = new Error('Hubo un error, Token no válido')
    return res.status(400).json({ msg: error.message })
  }
  res.json({ msg: 'Token válido' })
}
const updatePassword = async (req, res) => {
   const { token } = req.params
   const user = await User.findOne({ token })
   if (!user) {
     const error = new Error('Hubo un error, Token no válido')
     return res.status(400).json({ msg: error.message })
   }
  const {password} = req.body
  try {
    user.token = ''
    user.password = password
    await user.save()
    res.json({ msg: 'Password modificado correctamente' })

  } catch (error) {
    console.log(error);
  }

}
const admin = async (req, res) => {
  const { user } = req
  
  if(!user.admin){
    const error = new Error('No tienes permisos para acceder a esta ruta')
    return res.status(403).json({ msg: error.message })
  }
  res.json(user)
}
export {
  register,
  verifyAccount,
  login,
  user,
  admin,
  forgotPassword,
  verifyPasswordResetToken,
  updatePassword
}
