import { z } from 'zod'

const employeeSchema = z.object({
  id: z.string({
    invalid_type_error: 'ID must be a string',
    required_error: 'ID is required'
  })
    .max(50, { message: 'ID must be at most 50 characters long' }),
  first_name: z.string({
    invalid_type_error: 'First name must be a string',
    required_error: 'First name is required'
  })
    .max(30, { message: 'First name must be at most 30 characters long' }),
  second_name: z.string({
    invalid_type_error: 'Second name must be a string'
  })
    .max(30, { message: 'Second name must be at most 30 characters long' })
    .optional(),
  first_lastName: z.string({
    invalid_type_error: 'First last name must be a string',
    required_error: 'First last name is required'
  })
    .max(30, { message: 'First last name must be at most 30 characters long' }),
  second_lastName: z.string({
    invalid_type_error: 'Second last name must be a string'
  })
    .max(30, { message: 'Second last name must be at most 30 characters long' })
    .optional(),
  age: z.number({
    invalid_type_error: 'Age must be a number'
  })
    .int({ message: 'Age must be an integer' })
    .positive({ message: 'Age must be a positive number' }),
  address: z.string({
    invalid_type_error: 'Address must be a string',
    required_error: 'Address is required'
  }),
  email: z.string({
    invalid_type_error: 'Email must be a string'
  })
    .email({ message: 'Invalid email address' })
    .max(100, { message: 'Email must be at most 100 characters long' }),
  phone_number: z.string({
    invalid_type_error: 'Phone number must be a string'
  })
    .max(100, { message: 'Phone number must be at most 100 characters long' }),
  hire_date: z.string({
    invalid_type_error: 'Hire date must be a string'
  })
    .max(10, { message: 'Hire date must be at most 10 characters long' })
    .optional(),
  salary: z.string({
    invalid_type_error: 'Salary must be a string'
  })
    .max(20, { message: 'Salary must be at most 20 characters long' })
    .optional(),
  department: z.string({
    invalid_type_error: 'Department must be a string',
    required_error: 'Department is required'
  }),
  role: z.string({
    invalid_type_error: 'Role must be a string',
    required_error: 'Role is required'
  }),
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required'
  })
    .max(100, { message: 'Username must be at most 100 characters long' })
})

// Función para POST
export function validateEmployee(input) {
  return employeeSchema.safeParse(input)
}

// Función para PATCH
export function validatePartialEmployee(input) {
  return employeeSchema.partial().safeParse(input)
}

// CREATE TABLE employees (
//     id VARCHAR(50) PRIMARY KEY, -- Cedula como identificador único, max length 50
//     first_name VARCHAR(30) NOT NULL, -- Max length 30
//     second_name VARCHAR(30), -- Optional, max length 30
//     first_lastName VARCHAR(30) NOT NULL, -- Max length 30
//     second_lastName VARCHAR(30), -- Optional, max length 30
//     age INT CHECK (age > 0), -- Positive integer
//     address VARCHAR(255), -- Max length 255
//     email VARCHAR(100) UNIQUE NOT NULL, -- Max length 100, unique constraint
//     phone_number VARCHAR(100), -- Max length 100
//     hire_date VARCHAR(10), -- Cambiado a VARCHAR para manejar fechas como cadenas
//     salary VARCHAR(20), -- Cambiado a VARCHAR para manejar salarios como cadenas
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically set timestamp
//     department INT,
//     role INT,
//     username VARCHAR(100) UNIQUE NOT NULL, -- Max length 100, unique constraint
//     FOREIGN KEY (department) REFERENCES departments(id),
//     FOREIGN KEY (role) REFERENCES roles(id)
// );
