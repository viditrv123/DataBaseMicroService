import pool from '../db'
import Queries from '../queries'
import moment from 'moment/moment'

const createTransaction = async (req, res) => {
  try {
    const { body: { price, userId, itemId, walletValue } } = req
    const createdAt = moment().format('DD-MM-YYYY')
    console.log('Fetching users2')
    console.log(Queries.CREATE_TRANSACTION)
    const transaction = await pool.query(Queries.CREATE_TRANSACTION, [price, userId, itemId, createdAt])
    console.log('transaction')
    console.log(transaction.rows[0].id)
    const userData = await pool.query(Queries.DISPLAY_BY_ID + userId)
    console.log('newTransactionIds')
    const newTransactionIds = [...userData.rows[0].newtid, transaction.rows[0].id]
    console.log(newTransactionIds)
    const wallet = await pool.query(Queries.UPDATE_WALLET, [walletValue, newTransactionIds, userId])
    console.log('Fetching users')
    res.json({ success: true })
  } catch (e) {
    console.log('Error ' + e)
  }
}

const showTransactions = async (req, res) => {
  try {
    console.log('See here')
    const transaction = await pool.query(Queries.SHOW_TRANSACTION)
    res.json(transaction.rows)
  } catch (e) {
    console.log('error in showing transaction')
  }
}

const TransactionCrudModel = {
  createTransaction,
  showTransactions
}

export default TransactionCrudModel
