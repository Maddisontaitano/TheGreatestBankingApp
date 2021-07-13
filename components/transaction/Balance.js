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
                <h3 className={transactionsStyles.accountBalance}>Name</h3>
                <p>{props.username}</p>
            </div>
            <div className={transactionsStyles.accountBalanceContainer}>
                <h3 className={transactionsStyles.accountBalance}>User Id</h3>
                <p>{props.userId}</p>
            </div>
        </div>
    )
    
}

export default Balance
