import React, { useState } from "react";
import accountsStyles from '../styles/Accounts.module.css'
import AccountCard from '../components/account/accountCard'

const accounts = () => {
    // Fake api accounts fetch
    let [accountsFetch, addAccountsFetch] = useState([{name: 'John Doe', card: '**** **** **** 1234'}])
    
    
    const addAccount = () => {
        addAccountsFetch(accountsFetch => [...accountsFetch, {name: 'John Doe', card: '**** **** **** 1234'}])
    }
    
    return (
        <div className={accountsStyles.main}>
            {accountsFetch.map((account, key) => {return <AccountCard id={key} key={key} name={account.name} card={account.card}/>})}
            <div className={accountsStyles.add} onClick={addAccount}>+</div>
        </div>
    )
}

export default accounts
