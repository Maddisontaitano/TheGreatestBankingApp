import React from 'react'
import Link from 'next/link'
const index = () => {
    return (
        <div>
            <p>Index</p>
            <Link href='/integrations/plaid'><button>Plaid</button></Link>
        </div>
    )
}

export default index
