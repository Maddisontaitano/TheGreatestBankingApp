import React, {useEffect} from 'react'
import Head from 'next/head'
import { useIsLoggedIn } from '@/lib/swr-hooks';
import router from 'next/router'
const plaid = () => {
    const {loggedin, userId} = useIsLoggedIn();

    useEffect(() => {
        !loggedin ? router.push('/login') : ''
    }, [])
    // jQuery = window.jQuery
    const integratePlaid = async () => {
        const fetchLinkToken = async () => {
            const response = await fetch('../api/createLinkToken');
            const { linkToken } = await response.json();
            return linkToken;
        };
    
        const handler = Plaid.create({
            token: await fetchLinkToken(),
            onSuccess: async (publicToken, metadata) => {
                console.log("Public Token " + publicToken);
                console.log(metadata.institution.name);
                const bankName = metadata.institution.name
                fetch('/api/tokenExchange', {
                    method: 'POST',
                    body: JSON.stringify({ publicToken, userId, bankName }), 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((res) => res.json()).then((accountData) => {
                    console.log(accountData.accounts[0]);
                });
            },
             onEvent: (metadata) => {
                // console.log(metadata);
            },
            onExit: (error, metadata) => {
                // console.log(error, metadata);
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
            <button id='plaid-button' onClick={() => integratePlaid()}>Link acc with plaid</button>
        </>
    )
}

export default plaid
