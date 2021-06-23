import accountsStyles from '../../styles/Accounts.module.css'

const accountCard = (props) => {
    return (
        <div className={accountsStyles.card} id={props.id}>
            <div className={accountsStyles.names}>{props.name}</div>
            <div className={accountsStyles.cards}>{props.card}</div>
        </div>
    )
}

export default accountCard
