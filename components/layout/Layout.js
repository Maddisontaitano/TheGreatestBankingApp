  
import styles from '../../styles/global/Layout.module.css'
import Nav from './Nav'
import HeadComp from './HeadComp'

const Layout = ({ children }) => {
    return (
        <>
        <HeadComp />
        <Nav />
        <div className={styles.container}>
            {children}
        </div>
        </>
    )
}

export default Layout