import React, { useState, useRef, useEffect } from "react";
import { useAccounts, useIsLoggedIn } from '../lib/swr-hooks'
import accountsStyles from '../styles/pages/Accounts.module.css'
import Accounts from "../components/account/Accounts";
import router from 'next/router'
import AccountForm from '../components/account/AccountForm'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import { Loader, Segment, Dimmer } from "semantic-ui-react";

const accounts = () => {
    const {loggedin, userId} = useIsLoggedIn();
    useEffect(() => {
        !loggedin ? router.push({
                    pathname: '/login',
                    query: { message: "Login or signup to access your bank accounts!"}
                    }) : ''
      }, [])
    const [mounted, setMounted] = useState()
    const clickRef = useRef(null)
    const formRef = useRef(null)
    // const {loggedin, userId} = useIsLoggedIn();
    const { accounts, isLoad } = useAccounts(userId)
    const [ loading, setLoading ] = useState(false)
    const [ isFormToggled, toggleForm ] = useState(false)
    const [ formData, setFormData ] = useState(null)
    const [accountList, setAccountList] = useState(accounts)
    useEffect(() => {
        if(mounted && formData !== null){
            toggleForm(true)
        } else{
            setMounted(true)
        }
    }
    , [formData])

    useEffect(() => {
        setAccountList(accounts)
    }, [accounts])

    useEffect(() => {
        setLoading(false)
    }, [accountList])

    function reFetch() {
        fetch(`../pages/api/accounts/get-user-accounts?id=${userId}`)
        .then((response) => response.json())
        .then((accountData) => setAccountList(accountData))
    }

    const addAccount = async () => {
        setLoading(true)
        await integratePlaid()
        reFetch()
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
                const bankName = metadata.institution.name
                fetch('/api/tokenExchange', {
                    method: 'POST',
                    body: JSON.stringify({ publicToken, userId, bankName }), 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((res) => res.json()).then((accountData) => {
                    // console.log(accountData.accounts[0]);
                    // console.log(accounts);
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
    };

    const editAccount = (nickname, accoundId) => {
        setFormData({nickname: nickname, accountId: accoundId})
    }

    return (
        <div className={accountsStyles.main}>
            {loading ? <div className={accountsStyles.loginMsg}><SkeletonTheme color="#a8c4fd" highlightColor="#cfddfc"><Skeleton height={50} width={200}/></SkeletonTheme></div> 
            : 
                isFormToggled ?  <AccountForm exit={() => {toggleForm(false); setFormData(null); reFetch();} } formData={formData}/>
                : <>
                    {loggedin && accountList
                    ? <>
                        {accountList.length > 0 
                        ? <>
                            <Accounts accounts={accountList} editAccount={(nickname, accoundId) => editAccount(nickname, accoundId)}  />
                            {accountList.length < 5 ? <div className={accountsStyles.add} ref={clickRef} onClick={() => addAccount()} >+</div> : null}
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
