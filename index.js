import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

//Configurar la app
const app = express()

//Leer datos via Body
app.use(express.json())

//conectar a la base de datos
db()

//configurar cors
const whiteList = [process.env.FRONTEND_URL, ]
if(process.argv[2] === '--postman'){
  whiteList.push(undefined)
}
const corsOptions = {
  origin: function (origin, callback) {
   if(whiteList.includes(origin)){
      callback(null, true)
   }else{
      callback(new Error('No permitido por CORS'))
   }
  }
}
app.use(cors(corsOptions))


//definir una ruta
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)

//definir el puerto
const PORT = process.env.PORT || 4000

//iniciar el servidor
app.listen(PORT, () => {
  console.log(colors.blue(`El servidor esta funcionando en el puerto:`),colors.blue.bold(PORT))
})
