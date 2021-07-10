import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mutate } from 'swr'
import {useAccounts} from '@/lib/swr-hooks'
import ButtonLink from '../ButtonLink'
import Button from '../Button'
import router from 'next/router'

function User({ id, fname, lname, email, pass }) {
  const [deleting, setDeleting] = useState(false)
  const {accounts} = useAccounts(id)

  useEffect(() => {
    test()
    // accounts ? console.log(accounts) : console.log("No Account")
  }, [])

  const test =() => {
    fetch(`/api/get-account?id=${id}`,
    {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      }
    }
    ).then((res) => res.json()).then((dt) => console.log(dt))
  }

  async function deleteEntry() {
    setDeleting(true)
    let res = await fetch(`/api/delete-entry?id=${id}`, { method: 'DELETE' }) // fix api point
    let json = await res.json()
    if (!res.ok) throw Error(json.message);
    router.push('/login')
    // mutate('/api/get-entries')
    setDeleting(false)
  }

//   const testTransaction = () => {
//     fetch("/api/plaid-endpoints", {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify({userId: id})
//     }).then((res) => res.json()).then((dt) => console.log(dt))
// }
  return (
    <div>
      <div className="items-center ">
        <h1 className='text-black font-bold text-4xl'> Welcome, {fname} {lname}</h1>
        <br />
        <div className=" ml-4">
          <ButtonLink
            // href={`/entry/edit/${id}?title=${fname}&content=${fname}`} // fix api point
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
          <br />
          <button onClick={() => test()}>get all</button>

          {
           accounts ? accounts.map((account, index) => {
              return (
                <p key={index}>{account.bank_name}</p>
              )
            }) : (<h1>No Account Linked</h1>)
          }
        </div>
      </div>
    </div>
  )
}

export default User