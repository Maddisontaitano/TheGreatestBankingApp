import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const plaid = require('plaid');
const plaidClient = new plaid.Client({
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRETE,
    env: plaid.environments.development,
});
const util = require('util');
export default async (req, res) => {
    const {userId, data} = req.body;

      const results = await query(
        `
        SELECT * FROM accounts WHERE userId='${userId}'
        `
      )

    // console.log(accessToken);


    if (data == 'auth') {
        const authResponse = await plaidClient.getAuth(results[12].access_token);
        res.json({authResponse})
    }
    
    

    if (data == 'identity') {
        const identityResponse = await plaidClient.getIdentity(results[12].access_token);
        res.json({identityResponse})
    }

    if (data == 'balance') {
        const balanceResponse = await plaidClient.getBalance(results[12].access_token);
        res.json({balanceResponse})
    }

    if (data == 'transactions') {
        const transactionsResponse = await plaidClient.getTransactions(results[12].access_token, '2020-01-01', '2021-01-01', {account_ids: [results[12].savings_id, results[12].checking_id]});
        res.json({transactionsResponse})
    }
    
    // console.log(util.inspect(transactionsResponse, false, null, true));

    res.json({authResponse, identityResponse, balanceResponse, transactionsResponse});
    // res.json({authResponse, identityResponse, balanceResponse, transactionsResponse})
    // res.status(200).end();
  }
