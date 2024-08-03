import { getConnection } from '../../config/database.js'

export class DepartmentModel {
  static async getAll() {
    const connection = await getConnection()
    const [rows] = await connection.execute('SELECT * FROM departments')
    return rows
  }

  // static async getByName(name) {
  //   const connection = await getConnection()
  //   const [rows] = await connection.execute('SELECT * FROM departments WHERE name = ?', [name])
  //   return rows
  // }

  static async getDepartmentAndEmployeesByName(name) {
    const connection = await getConnection()

    const [rows] = await connection.execute(
      `SELECT d.id AS department_id, d.name AS department_name, d.totalEmployees, d.description, d.created_at AS department_created_at,
            e.id AS employee_id, e.first_name, e.second_name, e.first_lastName, e.second_lastName, e.age, e.address, e.email, e.phone_number,
            e.hire_date, e.salary, e.created_at AS employee_created_at, e.department, e.role, e.username
     FROM departments d
     LEFT JOIN employees e ON d.id = e.department
     WHERE d.name = ?`,
      [name]
    )

    if (rows.length === 0) {
      return { department: null, employees: [] }
    }

    const department = {
      id: rows[0].department_id,
      name: rows[0].department_name,
      totalEmployees: rows[0].totalEmployees,
      description: rows[0].description,
      created_at: rows[0].department_created_at
    }

    const employees = rows
      .filter(({ employee_id }) => employee_id !== null)
      .map(({
        employee_id, first_name, second_name, first_lastName, second_lastName,
        age, address, email, phone_number, hire_date, salary, employee_created_at,
        department, role, username
      }) => ({
        id: employee_id,
        first_name,
        second_name,
        first_lastName,
        second_lastName,
        age,
        address,
        email,
        phone_number,
        hire_date,
        salary,
        created_at: employee_created_at,
        department,
        role,
        username
      }))

    return { department, employees }
  }

  static async create(department) {
    const connection = await getConnection()
    const { name, totalEmployees, description } = department
    await connection.execute(
      'INSERT INTO departments (name, totalEmployees, description) VALUES (?, ?, ?)',
      [name, totalEmployees, description]
    )
  }

  static async updateByName(namee, department) {
    const connection = await getConnection()
    const { name, totalEmployees, description } = department
    const [result] = await connection.execute(
      'UPDATE departments SET name = ?, totalEmployees = ?, description = ? WHERE name = ?',
      [name, totalEmployees, description, namee]
    )

    return result
  }

  static async deleteByName(name) {
    const connection = await getConnection()
    const [result] = await connection.execute('DELETE FROM departments WHERE name = ?', [name])
    return result
  }
}
