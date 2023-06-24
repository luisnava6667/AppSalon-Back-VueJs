import { createTransport } from '../config/nodemailer.js'

export async function sendEmailNewAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )
  //enviar email
  const info = await transporter.sendMail({
    from: 'AppSalon <citas@appsalon.com>',
    to: 'admin@appsalon.com',
    subject: 'AppSalon - Nueva Cita',
    text: 'Nueva Cita',
    html: `
        <h1>Hola: Admin tienes una nueva cita</h1>
        <p>La cita será el día: ${date} a las ${time}horas</p>
      
    `
  })
  console.log('mensaje enviado', info.messageId)
}

export async function sendEmailUpdateAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )
  //enviar email
  const info = await transporter.sendMail({
    from: 'AppSalon <citas@appsalon.com>',
    to: 'admin@appsalon.com',
    subject: 'AppSalon - Cita Actualizada',
    text: 'Cita Actualizada',
    html: `
        <h1>Hola: Admin, un usuario ha modificado una cita.</h1>
        <p>La nueva cita será el día: ${date} a las ${time}horas</p>
      
    `
  })
  console.log('mensaje enviado', info.messageId)
}
export async function sendEmailCancelAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )
  //enviar email
  const info = await transporter.sendMail({
    from: 'AppSalon <citas@appsalon.com>',
    to: 'admin@appsalon.com',
    subject: 'AppSalon - Cita Cancelada',
    text: 'Cita Cancelada',
    html: `
        <h1>Hola: Admin, un usuario  ha cancelado una cita.</h1>
        <p>La cita estaba programada para: ${date} a las ${time}horas</p>
      
    `
  })
  console.log('mensaje enviado', info.messageId)
}