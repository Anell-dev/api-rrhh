import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const DEFAULT_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

let connection

async function getConnection() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(DEFAULT_CONFIG)
      console.log('Conexión a la base de datos establecida exitosamente.')
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error.message)
      process.exit(1) // Salir del proceso con un código de error
    }
  }
  return connection
}

export { getConnection }
