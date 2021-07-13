import React, { useState } from 'react'

const FlashMessage = (props) => {

    const [display, setDisplay] = useState(props.type + " " + 'displayFlashMessage')

    const clearMessage = () => {
         setDisplay("displayNone")
    }

    return (
        <div className={display}>
            <p>{props.message}</p><button onClick={clearMessage} className="closeFlashMessageButton">X</button>
        </div>
    )
}

export default FlashMessage