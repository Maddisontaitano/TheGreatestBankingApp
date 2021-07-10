import React, { useState, useEffect } from "react";
import transactionsStyles from "../styles/Transactions.module.css";
import TransactionHistory from "../components/transaction/TransactionHistory";
import {useUserTransactions, useIsLoggedIn, useAccounts} from '@/lib/swr-hooks'
const transactions = () => {
  let [transactionsFetch, addTransactionsFetch] = useState([
    { description: "Walmart", amount: "-$12.56" },
  ]);
  const [account, setaccount] = useState("0")
  const {loggedin, userId} = useIsLoggedIn();
  const {transactions} = useUserTransactions(userId, account);
  const {accounts} = useAccounts(userId)
  return (
    <div className={transactionsStyles.container}>
      {accounts ? accounts.map((acct, index) => {
        return(
          <div className='flex'><h1 onClick={() => setaccount(index)} className='p2'>{acct.bank_name}</h1></div>
        )
      }) : ("")}
      <div><button>Savings</button> <button>Checking</button></div>
      { transactions ? transactions.transactionsResponse ? transactions.transactionsResponse.transactions.map((trans, index) => {
        return (
          <>
          <br />
          <h1>{trans.merchant_name !== null ? trans.merchant_name : 'Unkonown Merchant'}</h1>
          <p>Amount: {trans.amount} {trans.iso_currency_code}</p>
          <p>Date: {trans.date}</p>
          <br /><br />
          </>
        )
      }) : (<h1>No Transactions</h1>) : <h1>Loading Transactions...</h1>}
        <p>Hello World</p>
    </div>
  );
};

export default transactions;
