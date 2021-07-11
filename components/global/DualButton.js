import sectionStyles from '../../styles/pages/Index/SectionA.module.css'

import React from 'react'

const DualButton = (props) => {
    return (
        <div className={`dualButtonContainer ${sectionStyles.buttonContainer} ${props.classNameProp}`}>
            <button onClick={props.button1OnClick } className={sectionStyles.buttonA}>{props.button1Text}</button>
            <button onClick={props.button2OnClick } className={sectionStyles.buttonB}>{props.button2Text}</button>
        </div>
    )
}

export default DualButton
