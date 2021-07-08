import React from 'react'

const users = () => {
    const handler = () => {
        fetch("/api/get-users", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => console.log(data))
    }
    return (
        <div>
            <button onClick={() => handler()}>Users</button>
        </div>
    )
}

export default users
