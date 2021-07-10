// How you render it then happens in a component(s)

import Account from './Account'
import AccountCard from '../account/accountCard'

function Accounts({ accounts, fname, lname }) {
  if (accounts) {
    return (
      <div>
        {accounts.map((e) => (
          <div key={e.accountId} className="py-2">
            <AccountCard username={`${fname} ${lname}`} id={e.accountId} type={e.type} userId={e.userId} balance={e.balance} />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Accounts