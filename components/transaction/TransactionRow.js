import React from 'react'

import transactionsStyles from "../../styles/pages/Transactions.module.css";

const TransactionRow = (props) => {
    if(props.type == "Expense") {
        return (
            <tr>
                <td className={transactionsStyles.typeExpense}></td>
                <td>{props.description}<br/><span>{props.date}</span></td>
                <td>-{props.amount}</td>
            </tr>
        )
    } else if (props.type == "Revenue") {
        return (
            <tr>
                <td className={transactionsStyles.typeRevenue}></td>
                <td>{props.description}<br/><span>{props.date}</span></td>
                <td>+{props.amount}</td>
            </tr>
        )
    }
}

export default TransactionRow
