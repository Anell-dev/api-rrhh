import { Router } from 'express'

const rolesRouter = Router()

rolesRouter.get('/', roleController)
rolesRouter.get('/:id', roleController)
rolesRouter.post('/', roleController)
rolesRouter.patch('/', roleController)
rolesRouter.delete('/:id', roleController)
