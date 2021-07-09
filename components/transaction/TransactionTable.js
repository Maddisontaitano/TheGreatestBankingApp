import React from 'react'
import transactionsStyles from "../../styles/pages/Transactions.module.css";

import Transactions from './Transactions';

import { useAccountTransactions } from '@/lib/swr-hooks';

const TransactionTable = (props) => {
    const { transactions } = useAccountTransactions(props.accountId);
    if(props.accountId == props.account) {
        return (
            <div className={transactionsStyles.containerB} id={props.id}>
                <div className={transactionsStyles.tableContainer}>
                        {props.children}                    
                        <Transactions transactions={transactions} />
                    <div className={transactionsStyles.tableFooter}></div>
                </div>    
            </div>
        )
    } else {
        return <div className="d-none"></div> 
    }
}

export default TransactionTable
