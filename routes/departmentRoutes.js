import { Router } from 'express'
import { DepartmentController } from '../controllers/departmentController.js'

export const createDepartmentRouter = ({ departmentModel }) => {
  const departmentController = new DepartmentController({ departmentModel })

  const departmentRoutes = Router()

  departmentRoutes.get('/', departmentController.getAll)
  departmentRoutes.get('/name/:name', departmentController.getByName)
  departmentRoutes.post('/', departmentController.create)
  departmentRoutes.patch('/name/:name', departmentController.updateByName)
  departmentRoutes.delete('/name/:name', departmentController.deleteByName)

  return departmentRoutes
}
