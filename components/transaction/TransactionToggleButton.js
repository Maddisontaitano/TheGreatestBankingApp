import React from 'react'
import transactionsStyles from "../../styles/pages/Transactions.module.css";

const TransactionToggleButton = (props) => {
    console.log(`grandchild updateAccount: ${props.updateAccount}`)
    if(props.accountId == props.activeButton) {
        return (
            <button id={props.accountId} onClick={() => props.updateAccount(props.AccountId)} 
            className={`${transactionsStyles.accountSelectButton} 
            ${transactionsStyles.accountSelectButtonActive}`}>{props.accountName}
            </button>
        )
    } else {
        return (
            <button id={props.accountId} onClick={() => props.updateAccount(props.accountId)} 
            className={transactionsStyles.accountSelectButton}>{props.accountName}
            </button>
        )
    }
}

export default TransactionToggleButton
