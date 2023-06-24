import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS,
  )
  //enviar email
  const info = await transporter.sendMail({
    from: 'AppSalon <cuentas@appsalon.com>',
    to: email,
    subject: 'AppSalon - Confirma tu cuenta',
    text: 'Confirma tu cuenta',
    html: `
        <h1>Hola: ${name}, confirma tu cuenta en AppSalon</h1>
        <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
        <p>Si no te has registrado en AppSalon, ignora este mensaje</p>
    `
  })
  console.log('mensaje enviado', info.messageId)
}
export async function sendEmailPasswordReset({ name, email, token }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS,
  )
  //enviar email
  const info = await transporter.sendMail({
    from: 'AppSalon <cuentas@appsalon.com>',
    to: email,
    subject: 'AppSalon - Restablece tu password ',
    text: 'Restablece tu password ',
    html: `
        <h1>Hola: ${name}, has solicitado restablecer tu password</h1>
        <p>Sigue el siguiente enlace para generar un nuevo password</p>
        <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Restablecer Password</a>
        <p>Si tu no solicitaste esto, puedes ignora este mensaje</p>
    `
  })
  console.log('mensaje enviado', info.messageId)
}
