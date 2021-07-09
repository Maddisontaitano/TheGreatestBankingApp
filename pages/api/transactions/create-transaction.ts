import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { recievingAccountId, description, cost, sendingAccountId } = req.query
  try {
    if (!recievingAccountId || !description || !cost || !sendingAccountId) {
      return res
        .status(400)
        .json({ message: '`recievingAccount`, `description`, `cost` and `sendingAccount` are all required' })
    }

    const recievingAccount = await query (
        `
        SELECT *
        FROM accounts
        WHERE accountId = ?
        `,
        recievingAccountId
    )

    console.log(recievingAccount)

    await console.log(recievingAccount[0].accountId)

    const sendingAccount = await query (
        `
        SELECT *
        FROM accounts
        WHERE accountId = ?
        `,
        sendingAccountId
    )

    // const recievingAccount = res.json(recievingAccountParsable)
    // const sendingAccount = res.json(sendingAccountParsable)

    const results = await query(
      `
      INSERT INTO transactions (accountId, description, cost, userId)
      VALUES (?, ?, ?, ?), (?, ?, ?, ?)
      `,
      [recievingAccount[0].accountId, description, `+${cost}`, recievingAccount[0].userId, sendingAccount[0].accountId, description, `-${cost}`, sendingAccount[0].userId]
    )

    const updateRecievingBalance = await query(
        `
        UPDATE accounts
        SET balance = ?
        WHERE accountID = ?
        `,
        [recievingAccount[0].balance+parseInt(cost[0]), recievingAccount[0].accountId]
    )

    const updateSendingBalance = await query(
        `
        UPDATE accounts
        SET balance = ?
        WHERE accountID = ?
        `,
        [sendingAccount[0].balance-parseInt(cost[0]), sendingAccount[0].accountId]
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler