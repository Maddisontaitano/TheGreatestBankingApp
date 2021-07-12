import React from 'react'
import transactionsStyles from "../../styles/pages/Transactions.module.css";

import TransactionToggleButton from './TransactionToggleButton';

const TransactionToggleMenu = ({ accounts, activeButton, updateAccount }) => {
    // console.log(`child updateAccount: ${updateAccount}`)
    if(accounts.length < 3) {
        return (
            <div className={`${transactionsStyles.tableHeaderA} ${transactionsStyles.tableHeader}`}>
                {accounts.map((e) => (
                    <TransactionToggleButton key={e.accountId} accountId={e.accountId} updateAccount={updateAccount} accountName={e.bank_name} activeButton={activeButton}/>
                ))}
            </div>
        )
    } else {
        return (
            <div className={`${transactionsStyles.tableHeaderB} ${transactionsStyles.tableHeader}`}>
                {accounts.map((e) => (
                    <TransactionToggleButton key={e.accountId} accountId={e.accountId} updateAccount={updateAccount} accountName={e.bank_name} activeButton={activeButton}/>
                ))}
            </div>
        )
    }
}

export default TransactionToggleMenu
