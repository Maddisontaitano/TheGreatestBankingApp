import React from 'react'
import Head from 'next/head'


const plaid = () => {
    // jQuery = window.jQuery
    const integratePlaid = async () => {
        const fetchLinkToken = async () => {
            const response = await fetch('/api/createLinkToken');
            const { linkToken } = await response.json();
            // console.log(linkToken);
            return linkToken;
        };
    
        const handler = Plaid.create({
            token: await fetchLinkToken(),
            onSuccess: async (publicToken, metadata) => {
                console.log(publicToken);
                // console.log(metadata);
                fetch('/api/tokenExchange', {
                    method: 'POST',
                    body: JSON.stringify({ publicToken }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((res) => res.json()).then((accountData) => {
                    console.log(accountData);
                });
            },
             onEvent: (metadata) => {
                // console.log(metadata);
            },
            onExit: (error, metadata) => {
                console.log(error, metadata);
            },
        });
        handler.open()
        // document.getElementById('plaid-button').addEventListener('click', function(e) {handler.open();})
    };
    return (
        <>
            <Head>
            <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
            </Head>
            <button id='plaid-button' onClick={() => integratePlaid()}>Link acc with pld</button>
        </>
    )
}

export default plaid
