const plaid = require('plaid');
const plaidClient = new plaid.Client({
    clientID: '',
    secret: '',
    env: plaid.environments.sandbox,
});
const util = require('util');
export default async (req, res) => {
    
    // res.setHeader('Access-Control-Allow-Origin', '*');
    
    const {publicToken} = req.body;

    const {access_token: accessToken} = await plaidClient.exchangePublicToken(publicToken);

    console.log(accessToken);


    const authResponse = await plaidClient.getAuth(accessToken);
    console.log('-------------------');
    console.log('Auth Response');
    console.log(util.inspect(authResponse, false, null, true));
    

    const identityResponse = await plaidClient.getIdentity(accessToken);
    console.log('-------------------');
    console.log('Indentity Response');
    console.log(util.inspect(identityResponse, false, null, true));

    const balanceResponse = await plaidClient.getBalance(accessToken);
    console.log('-------------------');
    console.log('Balance Endpoint');
    console.log(util.inspect(balanceResponse, false, null, true));

    const transactionsResponse = await plaidClient.getTransactions(accessToken, '2020-01-01', '2021-01-01', {});
    console.log('-------------------');
    console.log('Transactions Endpoint');
    console.log(util.inspect(transactionsResponse, false, null, true));

    res.json({authResponse, identityResponse, balanceResponse, transactionsResponse});
    // res.status(200).end();
  }
