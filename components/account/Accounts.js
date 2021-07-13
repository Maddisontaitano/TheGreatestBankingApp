// How you render it then happens in a component(s)

import Account from './Account'
import AccountCard from '../account/accountCard'

function Accounts({ accounts, editAccount }) {

  function handleEditAccount(e) {
    editAccount(e.nickname, e.accountId)
  }

  if (accounts) {
    return (
      <>
        {accounts.map((e, index) => {
          return <>
            <AccountCard accountId={e.accountId} nickname={e.nickname ? e.nickname : null} bank_name={e.bank_name} type={e.type} userId={e.userId} balance={e.balance} editAccount={() => handleEditAccount(e)}/>
          </>
        })}
      </>
    )
  } else {
    return null
  }
}

export default Accounts