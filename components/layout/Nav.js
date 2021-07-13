import navStyles from '../../styles/global/Nav.module.css'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import router from 'next/router'
import { useIsLoggedIn } from '@/lib/swr-hooks'

const Nav = () => {
    const {loggedin, userId} = useIsLoggedIn()
    useEffect(() => {
        console.log('Is user logged in: ' + loggedin)
    }, [])

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
            // alert('User Logged Out');
            router.push('/')
         } else {
            return;
         }
    }

    return (
        <div className={navStyles.nav}>
            <ul>
                {/* <img src='https://i.ibb.co/xszpynb/favicon.png' alt='bank'></img> */}
                {/* <img src='https://i.ibb.co/LZdfPsd/account.png' alt='user'></img> */}
                {!loggedin ? <li className={navStyles.title}><Link href='/'>Ark</Link></li> : <></>}
                {loggedin ? <li className={navStyles.title}><Link href={`/user/${userId}`}>Ark</Link></li> : <></>}
                {/* {<li className={navStyles.title}><Link href='/'>Ark</Link></li>} */}
                {/* <li><Link href='/'>Home</Link></li> */}
                <li><Link href='/transactions'>Transactions</Link></li>
                <li><Link href='/reports'>Reports</Link></li>
                <li><Link href='/integrations'>Integrations</Link></li>
                <li><Link href='/accounts'>Accounts</Link></li>
                <li className={navStyles.user} onMouseLeave={hideDropdown} >
                    {!loggedin ? <Link href='/login' className={navStyles.signIn}>Sign in ></Link> : <></>}
                    {loggedin ? <li onClick={() => logUserOut()} style={{cursor: 'pointer'}} href='/login' className={navStyles.signIn}>Sign out</li> : <></>}
                    <div className={navStyles.connector}></div>
                    <div className={navStyles.dropdown} ref={dropdown} style={{visibility: dropdownVisibility}} >
                        <ul>
                            {!loggedin ? (<li><Link href='/login'>Login</Link></li>) : <></>}
                            {!loggedin ? (<li><Link href='/signup'>Register</Link></li>) : <></>}
                            {loggedin ? (<li onClick={() => logUserOut()} style={{cursor: 'pointer'}}>Logout</li>) : <></>}
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Nav
