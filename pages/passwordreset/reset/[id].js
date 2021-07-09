import React, {useState} from 'react'
import Button from '../../../components/Button'
import Router from 'next/router'
// import 'fs';
const resetPass = () => {
    const [updatedPassword, setupdatedPassword] = useState('');

    const updateHandler = async () => {
        //THERE SHOULD BE AN INITIAL CHECK IF THE TOKEN EXISTS IN THE DATABASE
        const passwordToken = localStorage.getItem('passwordResetToken');
        const parsedPasswordToken = JSON.parse(passwordToken);

        // console.log(parsedPasswordToken.userId)
        // return;
        fetch('/api/update-user-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: parsedPasswordToken.userId,
                updatedPassword: updatedPassword
            }),
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            localStorage.removeItem('passwordResetToken');
            fetch('/api/confirm-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: parsedPasswordToken.email
                })
            })
            Router.push('/login')
        }) 
        
    }

    return (
        <div>
            <br />
            <p>Enter New Password</p>
            <input className="shadow border rounded w-full" type="password" placeholder="Enter new password" value={updatedPassword} onChange={(val) => setupdatedPassword(val.target.value)} />
            <br /><br />
            <Button onClick={() => updateHandler()}>Submit</Button>
        </div>
    )
}

export default resetPass;
