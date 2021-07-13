import transactionsStyles from "../../styles/pages/Transactions.module.css";
import { useState } from "react";
import { useAccounts, useAccountsTransactionTable, useIsLoggedIn } from "@/lib/swr-hooks";
import TransactionTable from './TransactionTable'
import TransactionToggleMenu from './TransactionToggleMenu'
import TransactionTables from "./TransactionTables";

function TransactionHistory ({ accounts, account, activeButton, updateAccount }) {
  // const [ loggedin, userId ] = useIsLoggedIn()

  // console.log(`Parent Update Account: ${updateAccount}`)

  if(accounts) {
    return (
      <div>
        <TransactionTables accounts={accounts} account={account} activeButton={activeButton} updateAccount={updateAccount} />
        {/* <TransactionTable accountId={109} account={account} >
          <TransactionToggleMenu accounts={accountData} activeButton={activeButton} updateAccount={updateAccount} />
        </TransactionTable>
        <TransactionTable accountId={110} account={account} >
          <TransactionToggleMenu accounts={accountData} activeButton={activeButton} updateAccount={updateAccount} />
        </TransactionTable> */}
      </div>
    );  
  } else {
    return (
      <>
        <div>
          <h1 className="font-bold text-3xl my-2">...</h1>
          <p>...</p>
        </div>
      </>
    )
  }
};

export default TransactionHistory;
