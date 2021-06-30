import { useState } from 'react'
import Link from 'next/link'
import { mutate } from 'swr'

import ButtonLink from '../ButtonLink'
import Button from '../Button'

function Transaction({ id, transactionDate, transactionTime, description, cost }) {
  const [deleting, setDeleting] = useState(false)

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
            <h1>{description}</h1>
            <h2>{cost}</h2>
            <p>Date: {`${transactionDate} ${transactionTime}`}</p>
          </a>
        </Link> 
        <p>{id}</p>
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

export default Transaction