import pool from '../db'
import Queries from '../queries'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import axios from 'axios'

const getUsers = async (req, res) => {
  console.log('getUsers')
  console.log(Queries.DISPLAY_ALL_RECORDS)
  const User = await pool.query(Queries.DISPLAY_ALL_RECORDS, ['ADMIN'])
  console.log(User.rows)
  console.log('Fetching users')
  res.json(User.rows)
}

const getAllUsersRoles = async (req, res) => {
  console.log('getUsers')
  console.log(Queries.DISPLAY_ALL_RECORDS)
  const User = await pool.query(Queries.DISPLAY_ALL_RECORDS, ['USER'])
  console.log(User.rows)
  console.log('Fetching users')
  res.json(User.rows)
}

const getUsersById = async (req, res) => {
  console.log('getUsersById')
  try {
    const { params: { id } } = req
    const query = Queries.DISPLAY_BY_ID + id
    const User = await pool.query(Queries.DISPLAY_BY_ID + id)
    console.log('Fetching users')
    res.json(User.rows)
  } catch (e) {
    console.log(e)
  }
}

const addingUser = async (req, res) => {
  console.log(req)
  console.log('addingUser')
  try {
    const { body: { email, role } } = req
    console.log(email + ' ' + role)
    const newUser = await pool.query(Queries.ADDING_USER, [email, role])
    const triggerMail = await axios.post('http://localhost:2000', { email, id: newUser.rows[0].id })
    console.log(newUser)
    res.json(newUser.rows)
  } catch (e) {
    console.log(e)
  }
}

const loginUser = async (req, res) => {
  console.log('loginUser')
  try {
    console.log(req.body)
    const { body: { email, password } } = req
    console.log(Queries.DISPLAY_BY_EMAIL)
    const newUser = await pool.query(Queries.DISPLAY_BY_EMAIL, [email])
    const { password: encryptedPassword } = newUser.rows[0]
    const isValidate = await verifyPassword(encryptedPassword, password)
    console.log(isValidate)
    if (isValidate) {
      const token = jwt.sign({ email }, process.env.SESSION_SECRET_KEY)
      req.session.token = token
      res.json({ success: true, user: newUser.rows, token })
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
  } catch (e) {
    console.log(e)
  }
}

const logout = (req, res) => {
  req.session.token = null
  req.session.destroy()
  res.json({ success: true })
}

const resetPassword = async (req, res) => {
  console.log('resetPassword')
  const { body: { newPassword, email } } = req
  try {
    console.log(typeof newPassword)
    const encryptedPassword = await encryption(newPassword)
    console.log(encryptedPassword)

    const response = await pool.query(Queries.UPDATING_USER_PASSWORD, [email, encryptedPassword])
    console.log(response.rows[0])
    console.log('response.rows[0]')
    res.json(response.rows[0])
  } catch (e) {
    console.log('error while encrypting ' + e)
  }
}

const encryption = async (password) => {
  console.log('encryption')
  try {
    const encryptedPassword = await bcrypt.hash(password, 10)
    return encryptedPassword
  } catch (e) {
    console.log('Error while encryption ' + e)
  }
}

const verifyPassword = async (encryptedPassword, password) => {
  console.log('verifyPassword')
  console.log(encryptedPassword + '      ' + password)
  try {
    const isValidate = await bcrypt.compare(password, encryptedPassword)
    return isValidate
  } catch (e) {
    console.log('Error while validation ' + e)
  }
}

const verifyToken = async (req, res) => {
  console.log('verifyToken')
  try {
    const authHeader = req.headers.authorization
    if (authHeader) {
      console.log('Show response1')
      const token = authHeader.split(' ')[1]
      console.log('Show response2')
      try {
        const decodedToken = jwt.verify(token, process.env.SESSION_SECRET_KEY)
        console.log('Show response3')
        const userEmail = decodedToken.email
        console.log('Show response4')
        console.log(decodedToken)
        try {
          const userData = await pool.query(Queries.DISPLAY_BY_EMAIL, [userEmail])
          console.log('Show response5')
          console.log(userData.rows)
          console.log(userData.rows.length === 1)
          if (userData.rows.length === 1) {
            res.json({ success: true, existingUserData: userData.rows[0] })
          } else {
            res.json({ success: false })
          }
        } catch (error) {
          console.log('Error while executing the database query: ' + error)
          res.json({ success: false })
        }
      } catch (error) {
        console.log('Error while decoding token: ' + error)
        res.json({ success: false })
      }
    } else {
      console.log('Unauthorised')
      res.json({ success: false })
    }
  } catch (e) {
    console.log('Error while validating token: ' + e)
    res.json({ success: false })
  }
}

const ApplicationCrudModel = {
  getUsers,
  getUsersById,
  addingUser,
  loginUser,
  resetPassword,
  verifyToken,
  logout,
  getAllUsersRoles
}

export default ApplicationCrudModel
