import React, { useState, useRef } from "react";
import accountsStyles from '../styles/Accounts.module.css'
import AccountCard from '../components/account/accountCard'

const accounts = () => {
    // Fake api accounts fetch
    let [accountsFetch, addAccountsFetch] = useState([{name: 'John Doe', card: '**** **** **** 1234'}])
    const clickRef = useRef(null)
    
    const addAccount = () => {        
        clickRef.current.style.margin = '3rem'; clickRef.current.style.height = '18rem'; clickRef.current.style.width = '18rem'; clickRef.current.style.color = 'white'; clickRef.current.style.opacity = '0'
        setTimeout(() => {            
            addAccountsFetch(accountsFetch => [...accountsFetch, {name: 'John Doe', card: '**** **** **** 1234'}])
            clickRef.current.style.opacity = '1'; clickRef.current.style.margin = '9rem'; clickRef.current.style.height = '3rem'; clickRef.current.style.width = '3rem'; clickRef.current.style.color = 'black';
        },200)
    }
    
    return (
        <div className={accountsStyles.main}>
            {accountsFetch.map((account, key) => {return <AccountCard id={key} key={key} name={account.name} card={account.card} />})}
            <div className={accountsStyles.add} ref={clickRef} onClick={addAccount} >+</div>
        </div>
    )
}

export default accounts
