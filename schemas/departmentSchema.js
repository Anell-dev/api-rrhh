import { z } from 'zod'

const departmentSchema = z.object({
  id: z.number({
    invalid_type_error: 'ID must be a number',
    required_error: 'ID is required'
  }).int({ message: 'ID must be an integer' }).positive({ message: 'ID must be a positive number' }).optional(), // optional because it is auto-increment
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  }).max(50, { message: 'Name must be at most 50 characters long' }),
  totalEmployees: z.number({
    invalid_type_error: 'Total employees must be a number'
  }).int({ message: 'Total employees must be an integer' }).nonnegative({ message: 'Total employees must be a non-negative number' }).optional().default(0),
  description: z.string({
    invalid_type_error: 'Description must be a string'
  }).optional(),
  created_at: z.string({
    invalid_type_error: 'Created at must be a string'
  }).optional()
})

// Función para POST
export function validateDepartment(input) {
  return departmentSchema.safeParse(input)
}

// Función para PATCH
export function validatePartialDepartment(input) {
  return departmentSchema.partial().safeParse(input)
}
