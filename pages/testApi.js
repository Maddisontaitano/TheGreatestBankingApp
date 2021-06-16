import Head from 'next/head'

const testApi = () => {

    const linkPlaid = async () => {
        const fetchLinkToken = async () => {
          const response = await fetch('/api/createLinkToken');
          const { linkToken } = await response.json();
        //   console.log(linkToken);
          return linkToken;
        };

        
      
        const handler = window.Plaid.create({
          token: await fetchLinkToken(),
          onSuccess: async (publicToken, metadata) => {
              console.log(publicToken);
              console.log(metadata);
              await fetch('/api/tokenExchange', {
                  method: 'POST',
                  body: JSON.stringify({ publicToken }),
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
          },
           onEvent: (metadata) => {
              console.log(metadata);
          },
          onExit: (error, metadata) => {
              console.log(error, metadata);
          },
        })
      
        handler.open();
      }

    return (
        <div>
            <Head>
                <title>Testig api</title>
                <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
            </Head>
            <h1>Caostone Project</h1>
            <span>Please to proceed link an account </span><br /><br />
            <button onClick={() => linkPlaid()}>Link Account</button>
                <br /><br />
            <i>Secured by <b>Plaid</b></i>
        </div>
    )
}

export default testApi
