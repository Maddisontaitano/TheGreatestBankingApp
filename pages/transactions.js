import React, { useState } from "react";
import transactionsStyles from "../styles/pages/Transactions.module.css";
import TransactionHistory from "../components/transaction/TransactionHistory";

const transactions = () => {
  let [transactionsFetch, addTransactionsFetch] = useState([
    { description: "Walmart", amount: "-$12.56" },
  ]);

  return (
    <div className={transactionsStyles.containerA}>
      
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
