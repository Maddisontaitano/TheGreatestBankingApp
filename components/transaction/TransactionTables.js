import TransactionTable from './TransactionTable'

function TransactionTables({ accounts, account }) {
  if (accounts) {
    return (
      <div>
        {accounts.map((e) => (
          <div key={e.accountId} className="py-2">
            <TransactionTable accountId={e.accountId} account={account} />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Accounts