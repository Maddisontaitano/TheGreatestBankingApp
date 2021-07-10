import React, {useState} from 'react'
import Button from '../../../components/Button'
import Router, {useRouter} from 'next/router'
// import 'fs';
const resetPass = () => {
    const [updatedPassword, setupdatedPassword] = useState('');
    const router = useRouter()
    const updateHandler = async () => {
        //THERE SHOULD BE AN INITIAL CHECK IF THE TOKEN EXISTS IN THE DATABASE
        const passwordToken = router.query.id?.toString();

        fetch('/api/verify-password-reset-token', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({token: passwordToken})
        }).then((res) => res.json()).then((user) => {
            // console.log(user.user.userId);
            // return;
            fetch('/api/update-user-password', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.user.userId,
                    updatedPassword: updatedPassword
                }),
            }).then((res) => res.json()).then((data) => {
                console.log(data)
                fetch('/api/confirm-reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: data.email
                    })
                })
                Router.push('/login')
        })
        
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
