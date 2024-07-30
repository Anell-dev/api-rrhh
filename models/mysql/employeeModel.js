import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.DB_HOST)

const DEFAULT_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

const connectionString = DEFAULT_CONFIG

let connection

try {
  connection = await mysql.createConnection(connectionString)
  console.log('Conexión a la base de datos establecida exitosamente.')
} catch (error) {
  console.error('Error al conectar a la base de datos:', error.message)
  process.exit(1) // Salir del proceso con un código de error
}

export class EmployeeModel {
  static async getAll() {
    const [rows] = await connection.execute('SELECT * FROM employees')
    return rows
  }

  // static async getAllByDepartment(departmentId) {
  //   const [rows] = await connection.execute('SELECT * FROM employees WHERE department = ?', [departmentId])
  //   return rows
  // }

  static async getById(id) {
    const [rows] = await connection.execute('SELECT * FROM employees WHERE id = ?', [id])
    return rows[0]
  }

  static async getByName(name) {
    const [rows] = await connection.execute('SELECT * FROM employees WHERE first_name = ?', [name])
    return rows
  }

  static async getByUserName(username) {
    const [rows] = await connection.execute('SELECT * FROM employees WHERE username = ?', [username])
    return rows[0]
  }

  static async create(employee) {
    const { id, first_name, second_name, first_lastName, second_lastName, age, address, email, phone_number, hire_date, salary, department, role, username } = employee
    await connection.execute(
      'INSERT INTO employees (id, first_name, second_name, first_lastName, second_lastName, age, address, email, phone_number, hire_date, salary, department, role, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, first_name, second_name, first_lastName, second_lastName, age, address, email, phone_number, hire_date, salary, department, role, username]
    )
  }

  static async updateById(id, employee) {
    const { first_name, second_name, first_lastName, second_lastName, age, address, email, phone_number, hire_date, salary, department, role, username } = employee
    const [result] = await connection.execute(
      'UPDATE employees SET first_name = ?, second_name = ?, first_lastName = ?, second_lastName = ?, age = ?, address = ?, email = ?, phone_number = ?, hire_date = ?, salary = ?, department = ?, role = ?, username = ? WHERE id = ?',
      [first_name, second_name, first_lastName, second_lastName, age, address, email, phone_number, hire_date, salary, department, role, username, id]
    )

    return result
  }

  static async deleteById(id) {
    const [result] = await connection.execute('DELETE FROM employees WHERE id = ?', [id])
    return result
  }
}
