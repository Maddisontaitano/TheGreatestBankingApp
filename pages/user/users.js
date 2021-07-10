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
            <button className='bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded' onClick={() => handler()}>Users</button>
        </div>
    )
}

export default users
