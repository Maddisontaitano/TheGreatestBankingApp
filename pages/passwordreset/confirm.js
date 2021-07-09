import React from 'react'
import Link from 'next/link'
import Button from '../../components/Button'
const confirm = () => {
    return (
        <div>
            <h1>Password Reset Link Sent!</h1>
            <p>Check your mail for reset link</p>
            <br />
            <Link href='/login'><Button>Return to Login</Button></Link>
        </div>
    )
}

export default confirm
