import React, { useState } from "react";
import transactionsStyles from "../styles/pages/Transactions.module.css";
import TransactionHistory from "../components/transaction/TransactionHistory";
import Balance from "../components/transaction/Balance";
import Skeleton from 'react-loading-skeleton'
import BalanceSkeleton from "../components/transaction/Skeletons/BalanceSkeleton";
import { useAccounts, useAccountsTransactionTable, useIsLoggedIn, useUserTransactions } from "@/lib/swr-hooks";

const transactions = () => {      
    // Getting user transaction data Step #3
  const { userData } = useUserTransactions(39)
  const { data, defaultValue, isLoad } = useAccountsTransactionTable(39);
  const [ account, setAccount ] = useState(109);
  const [ activeButton, setActiveButton ] = useState(109);

  const updateAccount = (id) => {
    if(account !== id && activeButton !== id) {
      setAccount(id)
      setActiveButton(id)
    } else return;
  }

  if(userData && data && account && activeButton) {
    return (
      <div className={transactionsStyles.containerA}>
        <Balance accountId={account}/>
        <TransactionHistory accountData={data} account={account} activeButton={activeButton} updateAccount={updateAccount} />
      </div>
    );
  } else return (
    <div className={transactionsStyles.containerA}>
      <BalanceSkeleton />
    </div>
  )
};

export default transactions;
