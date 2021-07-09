import transactionsStyles from "../../styles/pages/Transactions.module.css";
import { useState } from "react";
import { useAccounts, useAccountsTransactionTable } from "@/lib/swr-hooks";
import TransactionTable from './TransactionTable'
import TransactionToggleMenu from './TransactionToggleMenu'

const TransactionHistory = () => {
  const [ account, setAccount ] = useState(1);
  const { data, isLoad } = useAccountsTransactionTable(1);
  const [ activeButton, setActiveButton ] = useState(1);

  const updateAccount = (id) => {
    setAccount(id)
    setActiveButton(id)
  }

  console.log(`Parent Update Account: ${updateAccount}`)

  if(data) {
    return (
      <div>
        <TransactionTable accountId={1} account={account} >
          <TransactionToggleMenu accounts={data} activeButton={activeButton} updateAccount={updateAccount} />
        </TransactionTable>
        <TransactionTable accountId={2} account={account} >
          <TransactionToggleMenu accounts={data} activeButton={activeButton} updateAccount={updateAccount} />
        </TransactionTable>
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
