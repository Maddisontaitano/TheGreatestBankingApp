// How you render it then happens in a component(s)
import transactionsStyles from "../../styles/pages/Transactions.module.css";
import TransactionRow from "./TransactionRow"

function Transactions({ transactions }) {
  if (transactions) {
    // console.log(users)
    return (
     <table className={transactionsStyles.table}>
        <tbody>
          {transactions.map((e) => (
            <TransactionRow key={e.transactionId} date={e.transactionDate} description={e.description} amount={e.cost}/>
          ))}
        </tbody>
     </table>
    )
  } else {
    return null
  }
}

export default Transactions