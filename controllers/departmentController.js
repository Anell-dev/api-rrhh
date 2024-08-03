import { validateDepartment, validatePartialDepartment } from '../schemas/departmentSchema.js'

export class DepartmentController {
  constructor({ departmentModel }) {
    this.departmentModel = departmentModel
  }

  getAll = async (req, res) => {
    try {
      const departments = await this.departmentModel.getAll()
      if (departments.length === 0) {
        res.status(200).json({ message: 'there are no departments' })
      }
      res.status(200).json(departments)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // getByName = async (req, res) => {
  //   try {
  //     const { name } = req.params

  //     const department = await this.departmentModel.getByName(name)

  //     if (department) {
  //       res.status(200).json(department)
  //       // usar para la ui el nombre, total de empleados, la descripcion y fecha de la creacion
  //     }

  //     // return res.status(404).json({ error: 'Department not found' })
  //   } catch (error) {
  //     res.status(500).json({ error: error.message })
  //   }
  // }

  getByName = async (req, res) => {
    try {
      const { name } = req.params
      const result = await this.departmentModel.getDepartmentAndEmployeesByName(name)

      if (result.department) {
        res.status(200).json(result)
      } else {
        res.status(404).json({ message: 'Departamento no encontrado' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  create = async (req, res) => {
    try {
      const validationResult = validateDepartment(req.body)

      if (!validationResult.success) {
        return res.status(400).json(validationResult.error.errors)
      }

      await this.departmentModel.create(validationResult.data)

      res.status(201).json({ message: 'Department created successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateByName = async (req, res) => {
    try {
      const validationResult = validatePartialDepartment(req.body)

      if (!validationResult.success) {
        return res.status(400).json(validationResult.error.errors)
      }

      const { name } = req.params

      const result = await this.departmentModel.updateByName(name, validationResult.data)

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Department not found' })
      }

      res.status(200).json({ message: 'Department updated successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteByName = async (req, res) => {
    try {
      const { name } = req.params

      const result = await this.departmentModel.deleteByName(name)

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Department not found' })
      }

      res.json({ message: 'Department deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
