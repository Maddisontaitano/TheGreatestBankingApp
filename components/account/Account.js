import { useState } from 'react'
import Link from 'next/link'
import { mutate } from 'swr'
import { useAccountTransactions} from '@../../lib/swr-hooks'

import Container from '../Container'
import Transactions from '../transactions/Transactions'
import ButtonLink from '../ButtonLink'
import Button from '../global/Button'

function Account({ id, type, userId, balance, username }) {
  const [deleting, setDeleting] = useState(false)
  console.log(id)
  const {transactions, isLoad} = useAccountTransactions(id)

  async function deleteEntry() {
    setDeleting(true)
    let res = await fetch(`/api/delete-entry?id=${id}`, { method: 'DELETE' }) // fix api point
    let json = await res.json()
    if (!res.ok) throw Error(json.message)
    mutate('/api/get-users')
    setDeleting(false)
  }
  return (
    <div>
      <div className="flex items-center">
        <Link href={`/user/${id}`}> 
          <a className="font-bold py-2">
            <h1>User: {username}</h1>
            <h2>Balance {balance}</h2>
            <p>Type: {type}</p>
          </a>
        </Link> 
        <p>{id}</p>
        <h3>Transactions</h3>
        <Container>
            <Transactions transactions={transactions} accountId={id}/>
        </Container>
        <div className="flex ml-4">
          <ButtonLink
            // href={`/entry/edit/${id}?=${fname}&content=${fname}`} // fix api point
            className="h-5 py-0 mx-1"
          >
            Edit
          </ButtonLink>
          <Button
            disabled={deleting}
            onClick={deleteEntry}
            className="h-5 py-0 mx-1"
          >
            {deleting ? 'Deleting ...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Account