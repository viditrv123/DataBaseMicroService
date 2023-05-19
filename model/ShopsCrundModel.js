import pool from '../db'
import Queries from '../queries'

const getAllShops = async (req, res) => {
  try {
    console.log('Fetching users2')
    console.log(Queries.ALL_SHOPS)
    const shops = await pool.query(Queries.ALL_SHOPS)
    console.log('Fetching users')
    res.json(shops.rows)
  } catch (e) {
    console.log('Error ' + e)
  }
}

const getGroupsById = async (req, res) => {
  try {
    console.log('Fetching users3')
    const { params: { id } } = req
    console.log(id)
    const User = await pool.query(Queries.DISPLAY_GROUPS_BY_ID, [id])
    console.log(User.rows[0])
    console.log('Fetching users')
    res.json(User.rows[0])
  } catch (e) {
    console.log(e)
  }
}

const addingUser = async (req, res) => {
  console.log('groupUpload')
  try {
    const { body: { name } } = req
    const newUser = await pool.query(Queries.ADDING_USER, [name])
    console.log(newUser)
    res.json(newUser.rows)
  } catch (e) {
    console.log(e)
  }
}

const groupUpload = async (req, res) => {
  try {
    console.log(req.body)
    let { body: { oldGroups, peopleToUpdate, newGroups } } = req

    console.log(oldGroups)
    console.log(newGroups)
    oldGroups = oldGroups.filter(group => group.id)
    newGroups = newGroups.filter(group => group.id)
    console.log('Before groups')
    console.log(oldGroups)
    console.log(newGroups)
    for (let i = 0; i < newGroups.length; i = i + 1) {
      const result = await pool.query(Queries.ADDING_GROUP, [newGroups[i].id, newGroups[i].name, newGroups[i].members])
      console.log('result2')
      console.log(result)
    }
    for (let i = 0; i < peopleToUpdate.length; i = i + 1) {
      const result = await pool.query(Queries.UPDATING_GROUP_ID, [peopleToUpdate[i].groupid, peopleToUpdate[i].id])
      console.log('result100')
      console.log(result)
    }
    console.log(peopleToUpdate)

    res.json({ success: true })
  } catch (e) {
    console.log('Error while groupUpload: ' + e)
  }
}

const ShopsCrudModel = {
  getAllShops,
  getGroupsById,
  addingUser,
  groupUpload
}

export default ShopsCrudModel
