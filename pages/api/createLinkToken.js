const plaid = require('plaid');
const plaidClient = new plaid.Client({
    clientID: '', 
    secret: '', 
    env: plaid.environments.sandbox,
})

export default async (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {link_token: linkToken} = await plaidClient.createLinkToken({
        user: {
            client_user_id: 'ourUniID'
        },
        client_name: 'Capstone Finalcials',
        products: ['auth', 'identity'],
        country_codes: ['us'],
        language: 'en',
    });
    res.json({linkToken});
  }