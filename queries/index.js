const DISPLAY_ALL_RECORDS = 'SELECT * FROM "user" WHERE role=$1'
const DISPLAY_BY_ID = 'SELECT * FROM "user" WHERE id='
const DISPLAY_BY_EMAIL = 'SELECT * FROM "user" WHERE email = $1'
const ADDING_USER = 'INSERT INTO "user" (email, role)  VALUES($1, $2) RETURNING *'
const DISPLAY_ALL_GROUP = 'SELECT * FROM "groups";'
const DISPLAY_GROUPS_BY_ID = 'SELECT * FROM "groups" WHERE id=$1'
const UPDATING_USER_PASSWORD = 'UPDATE "user" SET password = $2 WHERE email = $1;'
const ADDING_GROUP = 'INSERT INTO "groups" (id, groupName, members) VALUES ($1, $2, $3) RETURNING *'
const UPDATE_GROUPS = 'UPDATE "groups" SET members = $1 WHERE id = $2;'
const UPDATING_GROUP_ID = 'UPDATE "user" SET groupid = $1 WHERE id = $2;'
const ADDING_TOKEN = 'INSERT INTO "resetpasswordid" (id, status)  VALUES($1,$2) RETURNING *'
const UPDATING_TOKEN = 'UPDATE "resetpasswordid" SET status = $1 WHERE id = $2;'
const VALID_TOKEN = 'SELECT * FROM "resetpasswordid" WHERE id=$1'
const ALL_SHOPS = 'SELECT * FROM "shops";'
const CREATE_TRANSACTION = 'INSERT INTO "transactions" (price, userId, itemId, createdAt) VALUES ($1,$2,$3,to_timestamp($4,\'DD-MM-YYYY\')) RETURNING *'
const UPDATE_WALLET = 'UPDATE "user" SET wallet = $1, newtid = $2 WHERE id = $3;'
const SHOW_TRANSACTION = 'SELECT * FROM "user" WHERE newtid IS NOT NULL'

const Queries = {
  DISPLAY_ALL_RECORDS,
  DISPLAY_BY_ID,
  ADDING_USER,
  DISPLAY_ALL_GROUP,
  DISPLAY_GROUPS_BY_ID,
  DISPLAY_BY_EMAIL,
  UPDATING_USER_PASSWORD,
  ADDING_GROUP,
  UPDATE_GROUPS,
  UPDATING_GROUP_ID,
  ADDING_TOKEN,
  UPDATING_TOKEN,
  VALID_TOKEN,
  ALL_SHOPS,
  CREATE_TRANSACTION,
  UPDATE_WALLET,
  SHOW_TRANSACTION
}

export default Queries
