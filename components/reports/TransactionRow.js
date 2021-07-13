import React from 'react'

const TransactionRow = (props) => {
    if(props.type == "Expense") {
        return (
            <tr>
                <td>{props.date}</td>
                <td>{props.description}<br/><span>{props.date}</span></td>
                <td>-{props.amount}</td>
            </tr>
        )
    } else if (props.type == "Revenue") {
        return (
            <tr>
                <td>{props.date}</td>
                <td>{props.description}</td>
                <td>+{props.amount}</td>
            </tr>
        )
    }
}

export default TransactionRow