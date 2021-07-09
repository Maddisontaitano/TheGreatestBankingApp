import accountsStyles from '../../styles/pages/Accounts.module.css'
import { useRef } from 'react'
import { useAccountTransactions } from '@/lib/swr-hooks'
import Transactions from '../../components/transaction/Transactions'
import Container from '../global/Container'

const accountCard = (props) => {
    const {transactions, idLoad} = useAccountTransactions(props.id)
    return (
        <div>
            <div className={accountsStyles.card} id={props.AccountId} >
                <div className={accountsStyles.names}>{props.type}</div>
                <div className={accountsStyles.cards}>{props.balance}</div>
            </div>
            <Container>
                <Transactions transactions={transactions} accountId={props.id}/>
            </Container>
        </div>
    )
}

export default accountCard