import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const plaid = require('plaid');
const plaidClient = new plaid.Client({
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRETE,
    env: plaid.environments.sandbox,
});
const util = require('util');
export default async (req, res) => {
    const {publicToken, userId, bankName} = req.body;
    const {access_token, item_id} = await plaidClient.exchangePublicToken(publicToken);
    console.log(publicToken)
    // const accountId = await 
    // const identityResponse = await plaidClient.getIdentity(access_token);
    const authResponse = await plaidClient.getAuth(access_token);
    const transactionsResponse = await plaidClient.getTransactions(access_token, '2018-01-01', '2021-01-01', {account_ids: [authResponse.accounts[0].account_id]});
    console.log('-------------------');
    console.log('-------------------');
    console.log('-------------------');
    console.log('-------------------');
    // console.log(util.inspect(identityResponse, false, null, true))
    console.log('-------------------');
    console.log('-------------------');
    console.log('-------------------');
    console.log('Auth Response');
    console.log(util.inspect(authResponse, false, null, true));
    console.log('Auth Response');
    // console.log('Transaction Response');
    // console.log(util.inspect(transactionsResponse, false, null, true));
    // console.log(transactionsResponse.transactions)
    console.log('Transaction Response');

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

    const newAccessToken = await query(`SELECT access_token, plaidId FROM accounts WHERE accountId = '70'`)
    // const accountId = await query(`SELECT accountId FROM accounts ORDER BY accountID DESC LIMIT 1`)

    // console.log(newAccessToken)
    const newTransactionsResponse = await plaidClient.getTransactions(newAccessToken[0].access_token, '2018-01-01', '2021-01-01', {account_ids: [newAccessToken[0].plaidId]});

    await query(
        `
        INSERT INTO accounts (userId, access_token, bank_name, plaidId)
        VALUES (${userId}, '${newAccessToken[0].access_token}', '${bankName}', '${newAccessToken[0].plaidId}')
        `
    );

    const accountId = await query(`SELECT accountId FROM accounts ORDER BY accountID DESC LIMIT 1`)
    console.log(accountId[0].accountId)

    function transactions(transactions) {
        for(let i = 0; i < transactions.length; i++) {
            let transactionAmount;
            let transactionType;
            // console.log(transactions[i].amount.toString()[0])
            if(transactions[i].amount.toString()[0] === '-') {
                transactionType = "Revenue"
                transactionAmount = transactions[i].amount.toString().substring(1)
                console.log(parseInt(transactionAmount))
                transactionAmount = parseInt(transactionAmount)
            } else {
                transactionType = "Expense";
                transactionAmount = transactions[i].amount;
                console.log(transactions[i].amount)
            }
            console.log(transactionType)
            console.log(transactions[i].name)
            query(
                `
                INSERT INTO transactions (accountId, userId, transactionType, description, cost, date, plaidId)
                VALUES (${accountId[0].accountId}, ${userId}, "${transactionType}", "${transactions[i].name}", ${transactionAmount}, '${transactions[i].date}', '${newAccessToken[0].plaidId}')
                `
            );
        }
    }

    console.log(newTransactionsResponse.transactions.length)
    console.log("****Testerrr*****")
    transactions(newTransactionsResponse.transactions);

    console.log(await query('SELECT * FROM accounts ORDER BY accountId DESC LIMIT 5'))
    console.log(await query('SELECT * FROM transactions ORDER BY transactionId DESC LIMIT 20'))

    // res.json({authResponse, identityResponse, balanceResponse, transactionsResponse});
    res.status(200).json(authResponse)
    // res.status(200).end();
  }
