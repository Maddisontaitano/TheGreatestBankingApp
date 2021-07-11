import React, { useState } from "react";
import transactionsStyles from "../styles/pages/Transactions.module.css";
import TransactionHistory from "../components/transaction/TransactionHistory";
import Balance from "../components/transaction/Balance";

const transactions = () => {      
  return (
    <div className={transactionsStyles.containerA}>
      <Balance />
      <TransactionHistory />
    </div>
  );
};

export default transactions;
