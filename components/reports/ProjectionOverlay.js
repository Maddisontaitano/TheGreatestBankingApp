import React from 'react'
import projectionStyles from '../../styles/components/Projection.module.css'
import sectionStyles from '../../styles/pages/Index/SectionA.module.css'
import SecondaryButton from '../global/SecondaryButton'

const ProjectionOverlay = ({month3, month6, exit}) => {
    return (
        <div>
            <div className={projectionStyles.background} onClick={exit}></div>
            <div className={projectionStyles.container}>
                <h2>ArkBank</h2>
                <h3>Projection Reports</h3>
                <p>Select a time period and ArkBank will give you a financial forecast 
                    based on your prior account history!
                </p>
                <div className="flex row">
                    <button className={`${projectionStyles.month3} ${projectionStyles.button}`} onClick={month3}>3 Months</button><br/>
                    <button className={`${projectionStyles.month6} ${projectionStyles.button}`} onClick={month6}>6 Months</button>
                </div>
            </div>   
        </div>
    )
}

export default ProjectionOverlay
