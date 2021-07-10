import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const plaid = require('plaid');
const plaidClient = new plaid.Client({
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRETE,
    env: plaid.environments.development,
});
const handler: NextApiHandler = async (req, res) => {
    const { id, account } = req.query;
    
    const tst = account.toString()
    const act = parseInt(tst)
    try {
        const results = await query(
            `
            SELECT * FROM accounts WHERE userId='${id}'
            `
          )

          const transactionsResponse = await plaidClient.getTransactions(results[act].access_token, '2021-07-07', '2021-10-07', {account_ids: [results[act].savings_id, results[act].checking_id]});
    return res.json({transactionsResponse});
    } catch (e) {
    res.status(500).json({ message: e.message })
    }
    }

export default handler