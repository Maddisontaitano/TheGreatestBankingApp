// How you render it then happens in a component(s)
import transactionsStyles from "../../styles/pages/Transactions.module.css";
import TransactionRow from "./TransactionRow"

function Transactions({ transactions }) {
  if (transactions) {
    // console.log(users)
    return (
        <tbody>
          {transactions.map((e) => (
            <TransactionRow key={e.transactionId} type={e.transactionType} date={e.date} description={e.description} amount={e.cost}/>
          ))}
        </tbody>
    )
  } else {
    return null
  }
}

export default Transactions
