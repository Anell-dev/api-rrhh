import { getConnection } from '../../config/database.js'

export class EmployeeModel {
  static async getAll() {
    const connection = await getConnection()
    const [rows] = await connection.execute('SELECT * FROM employees')
    return rows
  }

  static async getById(id) {
    const connection = await getConnection()
    const [rows] = await connection.execute('SELECT * FROM employees WHERE id = ?', [id])
    return rows[0]
  }

  static async getByName(name) {
    const connection = await getConnection()
    const [rows] = await connection.execute('SELECT * FROM employees WHERE first_name = ?', [name])
    return rows
  }

  static async getByUserName(username) {
    const connection = await getConnection()
    const [rows] = await connection.execute('SELECT * FROM employees WHERE username = ?', [username])
    return rows[0]
  }

  static async create(employee) {
    const connection = await getConnection()
    const { id, first_name, second_name, first_lastName, second_lastName, age, address, email, phone_number, hire_date, salary, department, role, username } = employee
    await connection.execute(
      'INSERT INTO employees (id, first_name, second_name, first_lastName, second_lastName, age, address, email, phone_number, hire_date, salary, department, role, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, first_name, second_name, first_lastName, second_lastName, age, address, email, phone_number, hire_date, salary, department, role, username]
    )
  }

  static async updateById(id, employee) {
    const connection = await getConnection()
    const { first_name, second_name, first_lastName, second_lastName, age, address, email, phone_number, hire_date, salary, department, role, username } = employee
    const [result] = await connection.execute(
      'UPDATE employees SET first_name = ?, second_name = ?, first_lastName = ?, second_lastName = ?, age = ?, address = ?, email = ?, phone_number = ?, hire_date = ?, salary = ?, department = ?, role = ?, username = ? WHERE id = ?',
      [first_name, second_name, first_lastName, second_lastName, age, address, email, phone_number, hire_date, salary, department, role, username, id]
    )

    return result
  }

  static async deleteById(id) {
    const connection = await getConnection()
    const [result] = await connection.execute('DELETE FROM employees WHERE id = ?', [id])
    return result
  }
}
