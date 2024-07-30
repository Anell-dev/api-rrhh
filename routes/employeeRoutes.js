import { Router } from 'express'
import { EmployeeController } from '../controllers/employeeController.js'

export const createEmployeeRouter = ({ employeeModel }) => {
  const employeeController = new EmployeeController({ employeeModel })

  const employeeRoutes = Router()

  employeeRoutes.get('/', employeeController.getAll)
  // employeeRoutes.get('/department/:departmentId', employeeController.getAllByDepartment)
  employeeRoutes.get('/id/:id', employeeController.getById)
  employeeRoutes.get('/name/:name', employeeController.getByName)
  employeeRoutes.get('/username/:username', employeeController.getByUserName)
  employeeRoutes.post('/', employeeController.create)
  employeeRoutes.patch('/id/:id', employeeController.updateById)
  employeeRoutes.delete('/id/:id', employeeController.deleteById)

  return employeeRoutes
}
