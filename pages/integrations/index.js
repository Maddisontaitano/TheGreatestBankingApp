import React, {useEffect} from 'react'
import Head from 'next/head'
import { useIsLoggedIn } from '@/lib/swr-hooks';
import styles from '../../styles/pages/Integrations.module.css'
import plaidImg from '../../public/plaid.png'
import router from 'next/router'
const plaid = () => {
    const {loggedin, userId} = useIsLoggedIn();

    useEffect(() => {
        !loggedin ? router.push({
                    pathname: '/login',
                    query: { message: "Login or signup to access bank integrations!"}
                    }) : ''
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
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            </Head>
            <div className={`${styles.plaidContainer} flex row`}>
                <div className={styles.plaidImg} ></div>
                <div className={`${styles.plaidContainerRight} flex column`}>
                    <h2 className={styles.plaidTitleA}>Plaid</h2>
                    <h3 className={styles.plaidTitleB}>The easiest way for people to connect their financial accounts to an app</h3>
                    <ul>
                        <li>Trusted by 10's of millions of users</li>
                        <li>World Leading Security</li>
                        <li>See all your bank data in real time</li>
                    </ul>
                    <button className={styles.plaidButton} id='plaid-button' onClick={() => integratePlaid()}>Link Your Bank Account</button>
                </div>
            </div>
        </>
    )
}

export default plaid
