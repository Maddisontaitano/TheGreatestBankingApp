import React, { useState, useRef, useEffect } from "react";
import { useAccounts, useIsLoggedIn } from '../lib/swr-hooks'
import accountsStyles from '../styles/pages/Accounts.module.css'
import Accounts from "../components/account/Accounts";
import AccountForm from '../components/account/AccountForm'


const accounts = () => {
    const [mounted, setMounted] = useState()
    const clickRef = useRef(null)
    const formRef = useRef(null)
    const {loggedin, userId} = useIsLoggedIn();
    const { accounts, isLoad } = useAccounts(userId)
    const [ loading, setLoading ] = useState(false)
    const [ isFormToggled, toggleForm ] = useState(false)
    const [ formData, setFormData ] = useState(null)
    useEffect(() => {
        if(mounted && formData !== null){
            toggleForm(true)
        } else{
            setMounted(true)
        }
    }
    , [formData])

    const addAccount = () => {// clickRef.current.style.margin = '3rem'; clickRef.current.style.height = '18rem'; clickRef.current.style.width = '18rem'; clickRef.current.style.color = 'white'; clickRef.current.style.opacity = '0'
        setLoading(true)
        integratePlaid()
    }

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
                    setLoading(false)
                    console.log(accounts);
                });
            },
             onEvent: (metadata) => {
                console.log(metadata);
            },
            onExit: (error, metadata) => {
                // console.log(error, metadata);
            },
        });
        handler.open()
    };

    const editAccount = (name) => {
        setFormData(name)
    }

    return (
        <div className={accountsStyles.main}>
            {loading ? <div className={accountsStyles.loginMsg}>Loading...</div> 
            : 
                isFormToggled ?  <AccountForm exit={() => {toggleForm(false); setFormData(null)} } name={formData}/>
                : <>
                    {loggedin && accounts
                    ? <>
                        {accounts.length > 0 
                        ? <>
                            <Accounts accounts={accounts} editAccount={(name) => editAccount(name)}  />
                            {accounts.length < 5 ? <div className={accountsStyles.add} ref={clickRef} onClick={() => addAccount()} >+</div> : null}
                        </>
                        : <div className={accountsStyles.loginMsg}>No accounts Available <div style={{cursor: 'pointer', color: 'blue', marginLeft: '24px'}} onClick={() => addAccount()} >Create Account</div></div>
                        }
                        </>
                    : <div className={accountsStyles.loginMsg}>Log In to see Accounts</div> }
                </>
                }
        </div>
    )
}

export default accounts
