import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const DEFAULT_CONFIG = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mysql'
}

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, { logging: false })
  : new Sequelize(DEFAULT_CONFIG.database, DEFAULT_CONFIG.username, DEFAULT_CONFIG.password, {
    host: DEFAULT_CONFIG.host,
    port: DEFAULT_CONFIG.port,
    dialect: DEFAULT_CONFIG.dialect,
    logging: false
  })

export default sequelize
