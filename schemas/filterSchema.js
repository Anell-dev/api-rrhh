import { z } from 'zod'

const filterSchema = z.enum(['id', 'name', 'username', 'department', 'role', 'age'])

const idFormatRegex = /^[0-9]{1}-[0-9]{3}-[0-9]{4}$/

const validateId = (id) => {
  if (idFormatRegex.test(id)) {
    return { success: true, value: id }
  } else {
    return { success: false, error: 'ID must be in the format of x-xxx-xxxx' }
  }
}

const validateFilterAndValue = (filter, value) => {
  console.log(`Validating filter: ${filter}, value: ${value}`)

  if (filter === 'age') {
    const result = z.number().safeParse(Number(value))
    console.log(`Age validation result: ${result.success}`)
    if (result.success) {
      return { success: true, value: result.data }
    } else {
      return { success: false, error: 'Value must be a valid number for age' }
    }
  } else if (filter === 'id') {
    return validateId(value)
  } else {
    const result = z.string().safeParse(value)
    console.log(`String validation result: ${result.success}`)
    if (result.success) {
      return { success: true, value: result.data }
    } else {
      return { success: false, error: 'Value must be a string or a number' }
    }
  }
}

export { filterSchema, validateFilterAndValue }
