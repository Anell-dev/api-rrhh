import { Router } from 'express'
import { EmployeeController } from '../controllers/employeeController.js'

export const createEmployeeRouter = ({ employeeModel }) => {
  const employeeController = new EmployeeController({ employeeModel })

  const employeeRoutes = Router()

  employeeRoutes.get('/', employeeController.getAll)
  employeeRoutes.get('/filter', employeeController.filterEmployees)
  employeeRoutes.post('/', employeeController.create)
  employeeRoutes.patch('/id/:id', employeeController.updateById)
  employeeRoutes.delete('/id/:id', employeeController.deleteById)

  return employeeRoutes
}
