import { validateEmployee, validatePartialEmployee } from '../schemas/employeeSchema.js'

export class EmployeeController {
  constructor({ employeeModel }) {
    this.employeeModel = employeeModel
  }

  getAll = async (req, res) => {
    try {
      const employees = await this.employeeModel.getAll()
      res.status(200).json(employees)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // getAllByDepartment = async (req, res) => {
  //   try {
  //     const { departmentId } = req.params

  //     const employees = await this.employeeModel.getAllByDepartment(departmentId)

  //     if (employees.length > 0) {
  //       res.status(200).json(employees)
  //     } else {
  //       res.status(404).json({ error: 'Employee in department not found' })
  //     }

  //     and add deparment not found
  //   } catch (error) {
  //     res.status(500).json({ error: error.message })
  //   }
  // }

  getById = async (req, res) => {
    try {
      const { id } = req.params

      const employee = await this.employeeModel.getById(id)

      if (employee) {
        res.status(200).json(employee)
      } else {
        res.status(404).json({ error: 'Employee not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getByName = async (req, res) => {
    try {
      const { name } = req.params

      const employee = await this.employeeModel.getByName(name)

      if (employee.length > 0) {
        return res.status(200).json(employee)
      } else {
        return res.status(404).json({ error: 'Employee not found' })
      }
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  getByUserName = async (req, res) => {
    try {
      const { username } = req.params

      const employee = await this.employeeModel.getByUserName(username)

      if (employee) {
        return res.status(200).json(employee)
      } else {
        return res.status(404).json({ error: 'Employee not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  create = async (req, res) => {
    try {
      const validationResult = validateEmployee(req.body)

      if (!validationResult.success) {
        return res.status(400).json(validationResult.error.errors)
      }

      await this.employeeModel.create(validationResult.data)

      res.status(201).json({ message: 'Employee created successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateById = async (req, res) => {
    try {
      const validationResult = validatePartialEmployee(req.body)

      if (!validationResult.success) {
        return res.status(400).json(validationResult.error.errors)
      }

      const { id } = req.params

      const result = await this.employeeModel.updateById(id, validationResult.data)

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee not found' })
      }

      res.status(200).json({ message: 'Employee updated successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  deleteById = async (req, res) => {
    try {
      const { id } = req.params

      const result = await this.employeeModel.deleteById(id)

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee not found' })
      }

      res.status(200).json({ message: 'Employee deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
