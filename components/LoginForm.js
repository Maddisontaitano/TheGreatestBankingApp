import { useState } from 'react'
import Router from 'next/router'

import Button from '@/components/'

export default function EntryForm() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          pass
        }),
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="my-4">
        <label htmlFor="email">
          <h3 className="font-bold">Email</h3>
        </label>
        <input
          id="email"
          className="shadow border rounded w-full"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div><div className="my-4">
        <label htmlFor="pass">
          <h3 className="font-bold">Password</h3>
        </label>
        <input
          id="pass"
          className="shadow border rounded w-full"
          type="text"
          name="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <Button disabled={submitting} type="submit">
        {submitting ? 'Creating ...' : 'Create'}
      </Button>
    </form>
  )
}