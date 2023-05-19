
import { Router } from 'express'
import ApplicationCrudModel from '../model/ApplicationCrudModel'
import GroupCrudModel from '../model/GroupCrudModel'
import ResetPasswordCrudModel from '../model/ResetPassordCrudModel'
import ShopsCrudModel from '../model/ShopsCrundModel'
import TransactionCrudModel from '../model/TransactionCrudModel'

const router = Router()
const authentication = Router()
const shops = Router()

router.get('/', (req, res) => ApplicationCrudModel.getUsers(req, res))
router.get('/getAllUsers', (req, res) => ApplicationCrudModel.getAllUsersRoles(req, res))
router.get('/:id', (req, res) => ApplicationCrudModel.getUsersById(req, res))
router.post('/', (req, res) => ApplicationCrudModel.addingUser(req, res))

router.post('/Login', (req, res) => ApplicationCrudModel.loginUser(req, res))
router.post('/reset-password', (req, res) => ApplicationCrudModel.resetPassword(req, res))
router.post('/reset-password/token', (req, res) => ResetPasswordCrudModel.addingToken(req, res))
router.post('/reset-password/expire', (req, res) => ResetPasswordCrudModel.updateToken(req, res))
router.post('/reset-password/valid', (req, res) => ResetPasswordCrudModel.validity(req, res))
router.post('/GroupUpdate', (req, res) => GroupCrudModel.groupUpload(req, res))
router.get('/getGroup/all', (req, res) => {
  console.log('Routes')
  GroupCrudModel.getGroup(req, res)
})

router.get('/group/:id', (req, res) => {
  console.log('Group Id')
  GroupCrudModel.getGroupsById(req, res)
})

shops.get('/', async (req, res) => ShopsCrudModel.getAllShops(req, res))

authentication.get('/verify', async (req, res) => await ApplicationCrudModel.verifyToken(req, res))
authentication.get('/logOut', async (req, res) => ApplicationCrudModel.logout(req, res))

router.post('/transaction-creation', (req, res) => TransactionCrudModel.createTransaction(req, res))
router.get('/show-transaction/display', (req, res) => TransactionCrudModel.showTransactions(req, res))

export { router, authentication, shops }
