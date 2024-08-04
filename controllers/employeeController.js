import { validateEmployee, validatePartialEmployee } from '../schemas/employeeSchema.js'
// import { validateFilter } from '../schemas/filterSchema.js'
import { filterSchema, validateFilterAndValue } from '../schemas/filterSchema.js'

export class EmployeeController {
  constructor({ employeeModel }) {
    this.employeeModel = employeeModel
  }

  getAll = async (req, res) => {
    try {
      const employees = await this.employeeModel.getAll()
      if (employees.length === 0) {
        res.status(200).json({ message: 'There are no employees' })
      }
      res.status(200).json(employees)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  filterEmployees = async (req, res) => {
    const { filter, value } = req.query

    const filterResult = filterSchema.safeParse(filter)
    if (!filterResult.success) {
      return res.status(400).json({ message: 'Invalid filter type' })
    }

    const valueResult = validateFilterAndValue(filter, value)
    if (!valueResult.success) {
      return res.status(400).json({ message: valueResult.error })
    }

    try {
      let employees
      switch (filter) {
        case 'id':
          employees = await this.employeeModel.getById(valueResult.value)
          break
        case 'name':
          employees = await this.employeeModel.getByName(valueResult.value)
          break
        case 'username':
          employees = await this.employeeModel.getByUserName(valueResult.value)
          break
        case 'department':
          employees = await this.employeeModel.getByDepartment(valueResult.value)
          break
        case 'role':
          employees = await this.employeeModel.getByRole(valueResult.value)
          break
        case 'age':
          employees = await this.employeeModel.getByAge(valueResult.value)
          break
        default:
          return res.status(400).json({ message: 'Invalid filter type' })
      }

      if (!employees || employees.length === 0) {
        return res.status(404).json({ message: 'No employees found' })
      }

      res.status(200).json(employees)
    } catch (error) {
      res.status(500).json({ message: error.message })
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
