import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'

import { useState, useEffect, useRef } from 'react'
import { useIsLoggedIn } from '@/lib/swr-hooks'

const Nav = () => {
    const {loggedin, userId} = useIsLoggedIn()
    useEffect(() => {
        console.log(loggedin)
    }, [])

import { useState, useRef } from 'react'

const Nav = () => {


    const [dropdownVisibility, changeDropdownVisibility] = useState('hidden')
    const dropdown = useRef(null)

    const showDropdown = () => {
        changeDropdownVisibility('')
        dropdown.current.style.opacity = '1'
        dropdown.current.style.right = '-4rem'
        dropdown.current.style.top = '12rem'
        dropdown.current.style.height = '16rem'
        dropdown.current.style.width = '10rem'
        setTimeout(() => {
            dropdown.current.style.color = 'black'
            dropdown.current.style.fontSize = '18px'
        }, 140)
    }
    
    const hideDropdown = () => {
        changeDropdownVisibility('hidden')
        dropdown.current.style.opacity = '0'
        dropdown.current.style.right = '5.6rem'
        // dropdown.current.style.right = '-4rem'
        dropdown.current.style.top = '3.5rem'
        dropdown.current.style.height = '0rem'
        dropdown.current.style.width = '0rem'
        // dropdown.current.style.width = '10rem'
        dropdown.current.style.color = 'white'
        dropdown.current.style.fontSize = '0px'
    }


    const logUserOut = () => {
        if (loggedin) {
            document.cookie = 'user=; Max-Age=0; path=/;';
            alert('User Logged Out');
            location.reload()
         } else {
            return;
         }
    }
    return (
        <div className={navStyles.nav}>
            <ul>
                <li className={navStyles.bank}><img src='https://i.ibb.co/xszpynb/favicon.png' alt='bank'></img></li>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/transactions'>Transactions</Link></li>
                <li><Link href='/reports'>Reports</Link></li>
                <li><Link href='/integrations'>Integrations</Link></li>
                <li><Link href='/accounts'>Accounts</Link></li>
                <li className={navStyles.user} onMouseEnter={showDropdown} onMouseLeave={hideDropdown} >

                    <Link href='#'><img src='https://i.ibb.co/LZdfPsd/account.png' alt='user'></img></Link>
                    <div className={navStyles.connector}></div>
                    <div className={navStyles.dropdown} ref={dropdown} style={{visibility: dropdownVisibility}} >
                        <ul>
                            {!loggedin ? (<li><Link href='/login'>Login</Link></li>) : <></>}
                            {!loggedin ? (<li><Link href='/signup'>Register</Link></li>) : <></>}
                            {loggedin ? (<li onClick={() => logUserOut()} style={{cursor: 'pointer'}}>Logout</li>) : <></>}

                    <Link href='/user'><img src='https://i.ibb.co/LZdfPsd/account.png' alt='user'></img></Link>
                    <div className={navStyles.connector}></div>
                    <div className={navStyles.dropdown} ref={dropdown} style={{visibility: dropdownVisibility}} >
                        <ul>
                            <li>Login</li>
                            <li>Register</li>

                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Nav