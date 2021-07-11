import React from 'react'
import styles from '../../styles/global/Button.module.css'

const SecondaryButton = (props) => {
    return (
        <button onClick={props.buttonClick} className={`${styles.buttonB} ${styles.button}`}>{props.buttonText}</button>
    )
}

export default SecondaryButton
