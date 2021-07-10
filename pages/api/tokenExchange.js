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
    const {publicToken, userId} = req.body;
    const {access_token, item_id} = await plaidClient.exchangePublicToken(publicToken);
    console.log(publicToken)
    const authResponse = await plaidClient.getAuth(access_token);
    console.log('-------------------');
    console.log('Auth Response');
    console.log(util.inspect(authResponse, false, null, true));

    const account_maped = {
        savings: '',
        checking: ''
    };

    authResponse.accounts.map((account) => {
        if (account.subtype == "checking") {
            // account_maped.push(account.account_id);
            account_maped.checking = account.account_id
        }
        if (account.subtype == "savings") {
            // account_maped.push(account.account_id)
            account_maped.savings = account.account_id
        }
    })

    await query(
        `
        INSERT INTO accounts (userId, access_token, bank_name, savings_id, checking_id)
        VALUES (${userId}, '${access_token}', '${authResponse.accounts[0].official_name}', '${account_maped.savings}', '${account_maped.checking}')
        `
      );

      const results = await query(
        `
        SELECT * FROM accounts
        `
      )
    

    // const identityResponse = await plaidClient.getIdentity(access_token);
    // console.log('-------------------');
    // console.log('Indentity Response');
    // console.log(util.inspect(identityResponse, false, null, true));

    // const balanceResponse = await plaidClient.getBalance(access_token);
    // console.log('-------------------');
    // console.log('Balance Endpoint');
    // console.log(util.inspect(balanceResponse, false, null, true));

    // const transactionsResponse = await plaidClient.getTransactions(access_token, '2020-01-01', '2021-01-01', {});
    // console.log('-------------------');
    // console.log('Transactions Endpoint');
    // console.log(util.inspect(transactionsResponse, false, null, true));

    // res.json({authResponse, identityResponse, balanceResponse, transactionsResponse});
    res.status(200).json(authResponse)
    // res.status(200).end();
  }
