import styles from '../../styles/components/Form.module.css'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Button from '../global/Button'
import PWStrength from './PWStrength'

export default function EntryForm() {
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loginSucces, setloginSucces] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    var hashedPassword = bcrypt.hashSync(pass, salt);
    // setPass(hash);
    
    try {
      const res = await fetch('/api/users/create-user', {
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
      // const json = await res.json()
      // if (!res.ok) throw Error(json.message);
      // console.log(json)
      const response = await fetch('/api/users/login-users', {
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
      const data = await response.json()
      if (!response.ok) throw Error(data.message)

      // SETTING THE EXPIRY DATE OF THE COOKIE
      const timestamp = new Date().getTime(); // current time
      const expiryDate = timestamp + (60 * 60 * 24 * 1000 * 7)
      // SETTING THE EXPIRY DATE OF THE COOKIE

      if (data.success) {
        setloginSucces("Succesfully Logged In")//Setting a succes message is login was succesfull
        document.cookie = `user=${data.userId}; ${expiryDate}; path=/;`;
        Router.push({
          pathname: `/integrations`,
          query: { message: "You've successfully logged in, welcome to ArkBank"}
        })
      } else {
        setloginSucces("Wrong Username / Password");//Setting a succes message is login was succesfull
      }
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <form className={styles.formContainer} onSubmit={submitHandler}>
      <h1 className={styles.formHeader}>Welcome to ArkBank</h1>
      <h2 className={styles.formSubheader}>The #1 most user friendly personal finance management system</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="fname">
          <h3 className={styles.label}>First</h3>
        </label>
        <input
          id="fname"
          className={styles.input}
          type="text"
          name="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="lname">
          <h3 className={styles.label}>Last</h3>
        </label>
        <input
          id="lname"
          className={styles.input}
          type="text"
          name="lname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
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
      </div>
      <PWStrength pass={pass} setPass={setPass}></PWStrength>
      {/* <div className="my-4">
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
      </div> */}
      <Button disabled={submitting} type="submit">
        {submitting ? 'Singing Up ...' : 'Sign up'}
      </Button>
      <div className={styles.formLinksContainer}>
        <Link href='/login' style={{cursor: 'pointer'}}>
          Already have an account? Sign In
        </Link>
      </div>
    </form>
  )
}
