import { Router } from 'express'
import { EmployeeController } from '../controllers/employees'

export const createEmployeeRouter = ({ employeeModel }) => {
  const employeeController = new EmployeeController({ employeeModel })

  const employeesRoutes = Router()

  employeesRoutes.get('/', employeeController.getAll)
  // employeesRoutes.get('/:id')
  // employeesRoutes.post('/')
  // employeesRoutes.patch('/:id')
  // employeesRoutes.delete('/:id')

  return employeesRoutes
}
