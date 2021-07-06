import React, { useState } from "react";
import transactionsStyles from "../styles/Transactions.module.css";
import TransactionHistory from "../components/transaction/TransactionHistory";

const transactions = () => {
  let [transactionsFetch, addTransactionsFetch] = useState([
    { description: "Walmart", amount: "-$12.56" },
  ]);

  return (
    <div className={transactionsStyles.container}>
      <h1>Transactions</h1>
      <div className={transactionsStyles.top}>
        <h4 className={transactionsStyles.descContainer}>Description</h4>
        <div className={transactionsStyles.line}></div>
        <h4 className={transactionsStyles.amountContainer}>Amount</h4>
      </div>
      <div>
        {transactionsFetch.map((transactions, key) => {
          return (
            <TransactionHistory
              key={key}
              description={transactions.description}
              amount={transactions.amount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default transactions;
