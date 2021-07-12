const plaid = require('plaid');
const plaidClient = new plaid.Client({
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRETE,
    env: plaid.environments.sandbox,
})

console.log(plaidClient)

export default async (req, res) => {
    console.log(plaidClient)
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { link_token: linkToken } = await plaidClient.createLinkToken({
        user: {
            client_user_id: 'some-unique-identifier',
        },
        client_name: 'Banking App',
        products: ['auth', 'transactions'],
        country_codes: ['US'],
        language: 'en',
    });

    console.log(linkToken)
    res.json({ linkToken });
  }
