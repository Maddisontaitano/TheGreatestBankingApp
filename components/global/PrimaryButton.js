import React from 'react'
import styles from '../../styles/global/Button.module.css'

const PrimaryButton = (props) => {
    return (
        <button onClick={props.buttonClick} className={`${styles.buttonA} ${styles.button}`}>{props.buttonText}</button>
    )
}

export default PrimaryButton
