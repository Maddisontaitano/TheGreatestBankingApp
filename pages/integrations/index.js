import React from 'react'
import Link from 'next/link'
import Button from '../../components/Button'
import {useAccounts, useIsLoggedIn} from '@/lib/swr-hooks';
const index = () => {
const {userId} = useIsLoggedIn()
const {accounts} = useAccounts(userId);
    return (
        <div>
            <p>Below Are Your Integrations</p>
            <p>{accounts ? accounts.map((account) => {
                return (
                    <p>{account.bank_name}</p>
                )
            }) : (<p>You have no integrations yet </p>)}</p>
            <Button href='/integrations/plaid'><button>Add new account with plaid</button></Button>
        </div>
    )
}

export default index
