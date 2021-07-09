import React from 'react'

import transactionsStyles from "../../styles/pages/Transactions.module.css";

const TransactionRow = (props) => {
    return (
        <tr>
            <td className={transactionsStyles.type}></td>
            <td>{props.description}<br/><span>{props.date}</span></td>
            <td>{props.amount}</td>
        </tr>
    )
}

export default TransactionRow
