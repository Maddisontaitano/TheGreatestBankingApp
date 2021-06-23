import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'

const Nav = () => {
    return (
        <div className={navStyles.nav}>
            <ul>
                <li className={navStyles.bank}><img src='https://i.ibb.co/xszpynb/favicon.png' alt='bank'></img></li>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/transactions'>Transactions</Link></li>
                <li><Link href='/reports'>Reports</Link></li>
                <li><Link href='/integrations'>Integrations</Link></li>
                <li><Link href='/accounts'>Accounts</Link></li>
                <li className={navStyles.user}><Link href='/user'><img src='https://i.ibb.co/LZdfPsd/account.png' alt='user'></img></Link></li>
            </ul>
        </div>
    )
}

export default Nav
