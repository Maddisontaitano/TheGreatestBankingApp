import accountsStyles from '../../styles/Accounts.module.css'
import { useRef, useEffect } from 'react'
import { useAccountTransactions } from '@/lib/swr-hooks'
import Transactions from '../transactions/Transactions'
import Container from '../Container'

const accountCard = (props) => {
    // useEffect(() => {
    //     props.user ? console.log(props.user) : console.log("Noting")
    // }, [props.user])
    const {transactions, idLoad} = useAccountTransactions(props.id)
    return (
        <div>
            {
                props.user && props.accounts ? props.accounts.map((account) => {
                   return (
                        <div className={accountsStyles.card} id={props.AccountId} >
                        <p>{ props.user.fname + " " + props.user.lname}</p>
                        <p>{account.bank_name }</p>
                        <div className={accountsStyles.names}>{props.type}</div>
                        <div className={accountsStyles.cards}>{props.balance}</div>
            </div>
                    )
                }) : (<p>Please Link An Account</p>)
            }
            <Container>
                <Transactions transactions={transactions} accountId={props.id}/>
            </Container>
        </div>
    )
}

export default accountCard