import accountsStyles from '../../styles/pages/Accounts.module.css'
import { useRef } from 'react'
import { useAccountTransactions } from '@/lib/swr-hooks'
import Transactions from '../../components/transaction/Transactions'
import Container from '../global/Container'

const accountCard = (props) => {
    return (
            <div key={props.accountId}>
                <div className={accountsStyles.card} id={props.accountId}>
                <div className={accountsStyles.username}>{props.bank_name}</div>
                { props.nickname 
                ? <div className={`${accountsStyles.edit} ${accountsStyles.cursor}`} >{props.nickname}</div> 
                : <div className={accountsStyles.edit} onClick={() => props.editAccount()}>Add Nickname</div>}
                <div className={accountsStyles.balance}>Balance: {props.balance}</div>
            </div>
        </div>
    )
}

export default accountCard