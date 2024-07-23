import express from 'express'
import { PORT } from './config.js'
import { createEmployeeRouter } from './routes/employees.js'

export const createApp = ({ employeeModel }) => {
  const app = express()
  // const PORT = process.env.PORT ?? 3000
  app.disable('x-powered-by')

  // app.get('/', (req, res) => {
  //   res.send('Hello World!')
  // })

  app.use('/employees', createEmployeeRouter({ employeeModel }))
  // app.use('/departments', departmentRoutes)
  // app.use('/roles', roleRoutes)

  app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
  })
}
