import { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'

import Button from '../components/Button'

export default function EntryForm() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loginSucces, setloginSucces] = useState('')

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch('/api/login-users', {
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
      const data = await res.json()
      if (!res.ok) throw Error(data.message)

      // SETTING THE EXPIRY DATE OF THE COOKIE
      const timestamp = new Date().getTime(); // current time
      const expiryDate = timestamp + (60 * 60 * 24 * 1000 * 7)
      // SETTING THE EXPIRY DATE OF THE COOKIE

      if (data.success) {
        setloginSucces("Succesfully Logged In")//Setting a succes message is login was succesfull
        document.cookie = `user=${data.userId}; ${expiryDate}; path=/;`;
        Router.push('/')
      } else {
        setloginSucces("Wrong Username / Password");//Setting a succes message is login was succesfull
      }
      console.log(data)
      // console.log(json.results[0].pass);
      // Router.push('/')
    } catch (e) {
      console.log(e.message)
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
        {submitting ? 'logging ...' : 'Login'}
      </Button>
        <br />
        <br />
      <Link href='/passwordreset' style={{cursor: 'pointer'}}>
        Forgot Password
      </Link>

      <p>{loginSucces}</p>
    </form>
  )
}