import { useState, useEffect } from 'react'
import Router from 'next/router'
import Button from '../components/Button'

export default function EntryForm() {
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    var hashedPassword = bcrypt.hashSync(pass, salt);
    // setPass(hash);
    
    try {
      const res = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          pass: hashedPassword
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
        <label htmlFor="fname">
          <h3 className="font-bold">First</h3>
        </label>
        <input
          id="fname"
          className="shadow border rounded w-full"
          type="text"
          name="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="lname">
          <h3 className="font-bold">Last</h3>
        </label>
        <input
          id="lname"
          className="shadow border rounded w-full"
          type="text"
          name="lname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
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
