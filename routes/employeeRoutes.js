import { Router } from 'express'
import { EmployeeController } from '../controllers/employeeController.js'

export const createEmployeeRouter = ({ employeeModel }) => {
  const employeeController = new EmployeeController({ employeeModel })

  const employeeRoutes = Router()

  // TODO: add inside the filter for id, name, age, username, departement, role
  employeeRoutes.get('/', employeeController.getAll)

  // NOTE: i think i going to change this logic andi will use just the main route / and inside add the filter for this options
  // employeeRoutes.get('/id/:id', employeeController.getById)
  // employeeRoutes.get('/name/:name', employeeController.getByName)
  // employeeRoutes.get('/username/:username', employeeController.getByUserName)
  // employeeRoutes.get('/department/:departmentId', employeeController.getAllByDepartment)
  // employeeRoutes.get('/role/:role', employeeController.getAllByRole)
  // employeeRoutes.get('/age/:age', employeeController.getAllByAge)

  employeeRoutes.post('/', employeeController.create)
  employeeRoutes.patch('/id/:id', employeeController.updateById)
  employeeRoutes.delete('/id/:id', employeeController.deleteById)

  return employeeRoutes
}
