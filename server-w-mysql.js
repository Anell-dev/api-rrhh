import { createApp } from './app.js'
import { EmployeeModel } from './models/mysql/employeeModel.js'
import { DepartmentModel } from './models/mysql/departmentModel.js'

createApp({ employeeModel: EmployeeModel, departmentModel: DepartmentModel })
