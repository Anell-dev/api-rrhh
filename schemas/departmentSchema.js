import { z } from 'zod'

const departmentSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  }).max(50, { message: 'Name must be at most 50 characters long' }),
  totalEmployees: z.number({
    invalid_type_error: 'Total employees must be a number',
    required_error: 'Total Employees is required'
  }).int({ message: 'Total employees must be an integer' }).nonnegative({ message: 'Total employees must be a non-negative number' }),
  description: z.string({
    invalid_type_error: 'Description must be a string',
    required_error: 'Description is required'
  })
})

// Función para POST
export function validateDepartment(input) {
  return departmentSchema.safeParse(input)
}

// Función para PATCH
export function validatePartialDepartment(input) {
  return departmentSchema.partial().safeParse(input)
}

// CREATE TABLE departments(
//   id INT AUTO_INCREMENT PRIMARY KEY, --Identificador único incremental para el departamento
//     name VARCHAR(50) NOT NULL UNIQUE, --Nombre del departamento, longitud máxima 50, debe ser único
//     totalEmployees INT DEFAULT 0, --Número total de empleados, valor por defecto: 0
//     description TEXT, --Descripción del departamento
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP-- Fecha y hora de creación, valor por defecto: timestamp actual
// );
