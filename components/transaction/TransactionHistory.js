import transactionsStyles from "../../styles/Transactions.module.css";

const TransactionHistory = (props) => {
  return (
    <div className={transactionsStyles.bottom} id={props.id}>
      <div className={transactionsStyles.description}>{props.description}</div>
      <div className={transactionsStyles.amount}>{props.amount}</div>
    </div>
  );
};

export default TransactionHistory;
