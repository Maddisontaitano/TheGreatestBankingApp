import React, { useState } from 'react'
import transactionsStyles from "../../styles/pages/Transactions.module.css";

import Transactions from './Transactions';
import TransactionTableSkeleton from './Skeletons/TransactionsTableSkeleton';

import { useAccountTransactions } from '@/lib/swr-hooks';

const TransactionTable = (props) => {
    const { transactions } = useAccountTransactions(props.accountId);
    const [tableHeight, setTableHeight] = useState(82)
    const extendTable = (val) => {
        setTableHeight(val += 82)
    }

    console.log("IMPORTANT")
    console.log(props.accountId)
    console.log(props.account)
    console.log("IMPORTANT")
    if(transactions) {
        if(props.accountId == props.account) {
            return (
                <div className={transactionsStyles.containerB} id={props.accountId}>
                        {props.children}                    
                    <div style={{maxHeight: `${tableHeight}vh`}} className={transactionsStyles.tableContainer}>
                            {/* {props.children}                     */}
                            <Transactions transactions={transactions} />
                        {/* <div className={transactionsStyles.tableFooter}></div> */}
                    </div>    
                    <div className={transactionsStyles.tableFooter}>
                        <button className={transactionsStyles.extendButton} onClick={() => extendTable(tableHeight)}>See more items</button>
                    </div>
                </div>
            )
        } else {
            return <div className="d-none"></div> 
        }
    } else {
        return <TransactionTableSkeleton />
    }
}

export default TransactionTable
