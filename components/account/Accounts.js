// How you render it then happens in a component(s)

import Account from './Account'
import AccountCard from '../account/accountCard'

function Accounts({ accounts, editAccount }) {

  function handleEditAccount(e) {
    let name
    if (e.nickname) {
      name = e.nickname 
    } else {
      name = e.bank_name 
    }
    editAccount(name)
  }

  if (accounts) {
    return (
      <>
        {accounts.map((e, index) => {
          return <>
            <AccountCard i={e.accountId} name={e.nickname ? e.nickname : e.bank_name} id={e.accountId} type={e.type} userId={e.userId} balance={e.balance} editAccount={() => handleEditAccount(e)}/>
          </>
        })}
      </>
    )
  } else {
    return null
  }
}

export default Accounts