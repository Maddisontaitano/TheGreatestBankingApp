import { json } from 'body-parser';
import React, {useState, useEffect} from 'react';
import Router from 'next/router'
import styles from '../../styles/components/Form.module.css'
import Button from '../../components/global/Button';
const forgotPassword = () => {
    const [email, setemail] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const forgotPasswordHandler = async () => {
        const res = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                email
            })
        })
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("passwordResetToken", JSON.stringify({token: data.token, userId: data.user.userId, email: data.user.email}));
            // console.log(data)
            Router.push("/passwordreset/confirm")
        } else {
            console.log("user not found");
            return;
        }
      }
    return (
        <div className={`${styles.formContainer} width60`}>
            <br />
            <h1>Forgot Password</h1>
            <br />
            <h3>Password reset link will be sent to your email</h3>
            <div className={styles.inputContainer}>
                <label htmlFor="email">
                    <h3 className={styles.label}>Email</h3>
                </label>
                <input className={styles.input} type="email" value={email} onChange={(val) => setemail(val.target.value)} />
            </div>
            <Button onClick={() => forgotPasswordHandler()}>Send reset link</Button>
        </div>
    )
}

export default forgotPassword
