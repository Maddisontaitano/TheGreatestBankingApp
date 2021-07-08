const plaid = require('plaid');
const plaidClient = new plaid.Client({
    clientID: '60c9d85df827550010b03a3b', 
    secret: '2100b4f5885c7916e922febc522d7e', 
    env: plaid.environments.sandbox,
})

export default async (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { link_token: linkToken } = await plaidClient.createLinkToken({
        user: {
            client_user_id: 'some-unique-identifier',
        },
        client_name: 'Banking App',
        products: ['auth', 'identity', 'income'],
        country_codes: ['US'],
        language: 'en',
    });

    res.json({ linkToken });
  }