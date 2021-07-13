// Run using npm run migrate
const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

console.log({ envPath })

require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
})

async function query(q) {
  try {
    const results = await db.query(q)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await query(`
    UPDATE accounts SET nickname = "daniel" WHERE accountId = 72
    `)
    // Can run queries to test mySQL here
    // console.log('*******')
    // console.log(await query('SELECT * FROM users'))
    // console.log('*******')
    // console.log(await query('SELECT * FROM accounts ORDER BY accountId DESC LIMIT 10'))
    console.log(await query('SELECT * FROM accounts WHERE accountId = 72'))
    // console.log('*******')
    // console.log(await query('SELECT * FROM transactions ORDER BY transactionId ASC LIMIT 10'))
    // console.log(await query('SELECT * FROM users ORDER BY userId DESC LIMIT 10'))
    // console.log(await query(`SELECT date, cost FROM transactions WHERE date >= "2020-03-12" AND date <= "2020-07-12" AND accountId = 107`))
    // console.log(await query(`SELECT cost FROM transactions WHERE transactionType = "Revenue" AND accountId = 107`))
    // console.log(await query('SELECT * FROM entries'))
  } catch (e) {
    console.log(e)
    console.error('could not run migration, double check your credentials.')
    process.exit(1)
  }
}

migrate().then(() => process.exit())

// Deletes most recent transaction by for account
// DELETE FROM transactions WHERE accountID = 107 ORDER BY transactionId DESC LIMIT 1

// Insert into
// INSERT INTO users ()
//     VALUES ()

// Transactions Table creation
// CREATE TABLE IF NOT EXISTS transactions ( 
//   transactionId INT AUTO_INCREMENT PRIMARY KEY,
//   accountId INT NOT NULL,
//   FOREIGN KEY (accountId) REFERENCES accounts(accountId),
//   date TIMESTAMP NOT NULL,
//   description TEXT NOT NULL,
//   cost INT NOT NULL
// )

// Account Table creation
// CREATE TABLE IF NOT EXISTS accounts ( 
//   accountId INT AUTO_INCREMENT PRIMARY KEY,
//   userId INT NOT NULL,
//   FOREIGN KEY (userId) REFERENCES users(userId),
//   type TEXT NOT NULL

// User Table Creation
// CREATE TABLE IF NOT EXISTS users (
//       userId INT AUTO_INCREMENT PRIMARY KEY,
//       fname TEXT NOT NULL,
//       lname TEXT NOT NULL,
//       dob TEXT NOT NULL,
//       email TEXT NOT NULL,
//       pass TEXT NOT NULL