import pool from '../db'
import Queries from '../queries'

const addingToken = async (req, res) => {
  console.log(req)
  try {
    const { body: { token } } = req
    const newToken = await pool.query(Queries.ADDING_TOKEN, [token, 'ACTIVE'])
    console.log('newToken here')
    console.log(newToken.rows)
    res.json(newToken.rows)
  } catch (e) {
    console.log(e)
  }
}
const updateToken = async (req, res) => {
  try {
    const { body: { token } } = req
    console.log('hI token')
    console.log(token)
    const newToken = await pool.query(Queries.UPDATING_TOKEN, ['EXPIRED', token])
    console.log('newToken1')
    console.log(newToken.rows)
    res.json(newToken.rows)
  } catch (e) {
    console.log(e)
  }
}

const validity = async (req, res) => {
  const { body: { token } } = req
  console.log('hI token')
  console.log(token)
  const newToken = await pool.query(Queries.VALID_TOKEN, [token])
  console.log('newToken12')
  console.log(newToken.rows[0])
  res.json(newToken.rows[0])
}

const ResetPasswordCrudModel = {
  addingToken,
  updateToken,
  validity
}

export default ResetPasswordCrudModel
