import styles from '../../styles/components/Form.module.css'

import { useState } from 'react'
import Router from 'next/router'
import { useRouter } from 'next/router'
import Link from 'next/link'
import FlashMessage from '../../components/flash/FlashMessage'

import Button from '../global/Button'

export default function EntryForm() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loginSucces, setloginSucces] = useState('')
  const router = useRouter()
  const message = router.query.message?.toString()
  // window.history.replaceState(null, '', '/login')
  // router.replace("/login", undefined, { shallow: true });


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
        Router.push({
          pathname: `/user/${data.userId}`,
          query: { message: "You've successfully logged in, welcome to ArkBank"}
        })
      } else {
        setloginSucces("Wrong Username / Password");//Setting a succes message is login was succesfull
      }
      // Router.push('/')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <form className={styles.formContainer} onSubmit={submitHandler}>
      {message ? <FlashMessage type="error" message={message} /> : <></>}
      <h1 className={styles.formHeader}>Welcome to ArkBank</h1>
      <h2 className={styles.formSubheader}>The #1 most user friendly personal finance management system</h2>
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
      <div className={styles.formLinksContainer}>
        <Link href='/signup' style={{cursor: 'pointer'}}>
          Need an account? Sign Up
        </Link>
        <Link href='/passwordreset' style={{cursor: 'pointer'}}>
          Forgot Password?
        </Link>
      </div>
    </form>
  )
}