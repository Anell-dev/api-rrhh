import { getConnection } from '../../config/database.js'

export class DepartmentModel {
  static async getAll() {
    const connection = await getConnection()
    const [rows] = await connection.execute('SELECT * FROM departments')
    return rows
  }

  static async getById(id) {
    const connection = await getConnection()
    const [rows] = await connection.execute('SELECT * FROM departments WHERE id = ?', [id])
    return rows[0]
  }

  static async create(department) {
    const connection = await getConnection()
    const { id, name, description } = department
    await connection.execute(
      'INSERT INTO departments (id, name, description) VALUES (?, ?, ?)',
      [id, name, description]
    )
  }

  static async updateById(id, department) {
    const connection = await getConnection()
    const { name, description } = department
    const [result] = await connection.execute(
      'UPDATE departments SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    )

    return result
  }

  static async deleteById(id) {
    const connection = await getConnection()
    const [result] = await connection.execute('DELETE FROM departments WHERE id = ?', [id])
    return result
  }
}
