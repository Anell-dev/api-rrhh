import { validateDepartment, validatePartialDepartment } from '../schemas/departmentSchema.js'

export class DepartmentController {
  constructor({ departmentModel }) {
    this.departmentModel = departmentModel
  }

  getAll = async (req, res) => {
    try {
      const departments = await this.departmentModel.getAll()
      res.status(200).json(departments)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getByName = async (req, res) => {
    try {
      const department = await this.departmentModel.getByName(req.params.name)
      if (!department) {
        return res.status(404).json({ error: 'Department not found' })
      }
      res.json(department)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching department' })
    }
  }

  create = async (req, res) => {
    const { success, error } = validateDepartment(req.body)
    if (!success) {
      return res.status(400).json(error.issues)
    }

    try {
      await this.departmentModel.create(req.body)
      res.status(201).json({ message: 'Department created successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error creating department' })
    }
  }

  updateByName = async (req, res) => {
    const { success, error } = validatePartialDepartment(req.body)
    if (!success) {
      return res.status(400).json(error.issues)
    }

    try {
      const result = await this.departmentModel.updateByName(req.params.name, req.body)
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Department not found' })
      }
      res.json({ message: 'Department updated successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error updating department' })
    }
  }

  deleteByName = async (req, res) => {
    try {
      const result = await this.departmentModel.deleteByName(req.params.name)
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Department not found' })
      }
      res.json({ message: 'Department deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error deleting department' })
    }
  }
}
