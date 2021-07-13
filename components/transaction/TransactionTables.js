import TransactionTable from './TransactionTable'

import TransactionToggleMenu from './TransactionToggleMenu';

function TransactionTables({ accounts, account, activeButton, updateAccount }) {
  if (accounts) {
    return (
      <div>
        {accounts.map((e) => (
          <TransactionTable key={e.accountId} accountId={e.accountId} account={account} >
            <TransactionToggleMenu accounts={accounts} activeButton={activeButton} updateAccount={updateAccount} />
          </TransactionTable>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default TransactionTables;