import { Router } from 'express'
import { DeparmentController } from '../controllers/DeparmentController.js'

export const createDeparmentRouter = ({ deparmentModel }) => {
  const departmentRoutes = Router()

  const departmentController = new DeparmentController({ deparmentModel })

  departmentRoutes.get('/', departmentController.getAll)
  departmentRoutes.get('/:id')

  return departmentRoutes
}
