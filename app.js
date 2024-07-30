import express, { json } from 'express'
// import { PORT } from './config.js'
import { createEmployeeRouter } from './routes/employeeRoutes.js'
// import { corsMiddleware } from './middlewares/cors.js'
import dotenv from 'dotenv'
// import { createDeparmentRouter } from './routes/departmentRoutes.js'
// import sequelize from './config/database.js'
// import { } from './models/mysql/'

dotenv.config()

export const createApp = ({ employeeModel }) => {
  const app = express()

  app.use(json()) //! acceso al objeto JSON enviado en la solicitud
  // app.use(corsMiddleware()) //! usar en caso de que otras personas quieran usar mi API
  app.disable('x-powered-by') //! medida de seguridad para ocultar que estás utilizando Express

  const PORT = process.env.PORT ?? 1234

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.use('/employees', createEmployeeRouter({ employeeModel }))
  // app.use('/departments', createDeparmentRouter({ deparmentModel }))

  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
  })
}

// app.listen(PORT, async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('Database connected')
//     await sequelize.sync()
//     console.log(`App listening on http://localhost:${PORT}`)
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// })

// app.use('/roles', roleRoutes)
