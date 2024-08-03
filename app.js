// import { corsMiddleware } from './middlewares/cors.js'
import express, { json } from 'express'
import dotenv from 'dotenv'
import { createEmployeeRouter } from './routes/employeeRoutes.js'
import { createDepartmentRouter } from './routes/departmentRoutes.js'

dotenv.config()

export const createApp = ({ employeeModel, departmentModel }) => {
  const app = express()

  app.use(json()) //! acceso al objeto JSON enviado en la solicitud
  app.disable('x-powered-by') //! medida de seguridad para ocultar que estás utilizando Express
  // app.use(corsMiddleware()) //! usar en caso de que otras personas quieran usar mi API

  const PORT = process.env.PORT ?? 1234

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.use('/employees', createEmployeeRouter({ employeeModel }))
  app.use('/departments', createDepartmentRouter({ departmentModel }))

  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
  })
}

// app.use('/roles', roleRoutes)
