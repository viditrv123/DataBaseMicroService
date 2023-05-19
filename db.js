import dotenv from 'dotenv'

import PG from 'pg'
dotenv.config()

const Pool = PG.Pool

const pool = new Pool(
  {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: 5432
  }
)

export default pool
