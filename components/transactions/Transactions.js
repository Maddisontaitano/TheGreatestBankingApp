// How you render it then happens in a component(s)

import Transaction from './Transaction'

function Transactions({ transactions, accountId }) {
  if (transactions) {
    // console.log(users)
    return (
      <div>
        {transactions.map((e) => (
          <div key={e.transactionId} className="py-2">
            <Transaction id={e.transactionId} transactionDate={e.transactionDate} 
            transactionTime={e.transactionTime} description={e.description}
            cost={e.cost} accountId={accountId}
             />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Transactions