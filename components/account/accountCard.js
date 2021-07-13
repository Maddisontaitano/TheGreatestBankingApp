import accountsStyles from '../../styles/pages/Accounts.module.css'
import { useRef } from 'react'
import { useAccountTransactions } from '@/lib/swr-hooks'
import Transactions from '../../components/transaction/Transactions'
import Container from '../global/Container'

const accountCard = (props) => {
    return (
            <div key={props.i}>
                <div className={accountsStyles.card} id={props.id}>
                <div className={accountsStyles.username}>{props.name}</div>
                <div className={accountsStyles.type}>{props.type}</div>
                <div className={accountsStyles.balance}>{props.balance}</div>
                <div className={accountsStyles.edit} onClick={() => props.editAccount()}>Edit</div>
            </div>
        </div>
    )
}

export default accountCard