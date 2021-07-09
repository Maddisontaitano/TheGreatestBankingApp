import styles from '../../styles/components/Form.module.css'

import { useState } from 'react'
import Router from 'next/router'

import Button from '../global/Button'

export default function EntryForm() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loginSucces, setloginSucces] = useState('')

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch('/api/users/login-users', {
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
    <form className={styles.formContainer} onSubmit={submitHandler}>
      <div className={styles.inputContainer}>
        <label htmlFor="email">
          <h3 className={styles.label}>Email</h3>
        </label>
        <input
          id="email"
          className={styles.input}
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      {/* <hr /> */}
      </div>
      {/* <hr /> */}
      <div className={styles.inputContainer}>
        <label htmlFor="pass">
          <h3 className={styles.label}>Password</h3>
        </label>
        <input
          id="pass"
          className={styles.input}
          type="text"
          name="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <Button disabled={submitting} type="submit">
        {submitting ? 'logging in ...' : 'Login'}
      </Button>

      <p>{loginSucces}</p>
    </form>
  )
}
