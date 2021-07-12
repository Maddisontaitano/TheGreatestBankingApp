import transactionsStyles from "../../styles/pages/Transactions.module.css";
import React from 'react'
import { useAccount } from "@/lib/swr-hooks";

const Balance = (props) => {
    const { account } = useAccount(props.accountId)
    return (
        <div className={`${transactionsStyles.containerB} ${transactionsStyles.containerC}`}>
            <p>Account Balance</p>     
            <h2 className={transactionsStyles.balanceAmount}>${account}</h2>
            <hr />
            <div className={transactionsStyles.accountBalanceContainer}>
                <h3 className={transactionsStyles.accountBalance}>Account Balance:</h3>
                <p>$757.29</p>
            </div>
            <div className={transactionsStyles.accountBalanceContainer}>
                <h3 className={transactionsStyles.accountBalance}>Account Balance:</h3>
                <p>$100.00</p>
            </div>
        </div>
    )
    
}

export default Balance
