'use strict'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import { router, authentication, shops } from './routes'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: Number(process.env.SESSION_TIME_OUT_LIMIT)
    }
  })
)

const port = 8000

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

app.use('/api/v1/route', router)
app.use('/authenticate', authentication)
app.use('/shops', shops)
