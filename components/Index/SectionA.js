import React from 'react'
import Link from 'next/link'
import styles from '../../styles/pages/Index/Index.module.css'
import sectionStyles from '../../styles/pages/Index/SectionA.module.css'

const SectionA = () => {
    return (
        <div className={styles.sectionA}>
           <div className={sectionStyles.containerA}>
               <h2 className={`${sectionStyles.title} ${sectionStyles.titleA}`}>Welcome to ArkBank</h2>
               <h3 className={`${sectionStyles.titleB}`}>Create beautiful, custom financial reports</h3>
               <p className={`${sectionStyles.descriptionA}`}>ArkBank allows you to integrate
               with all of your bank accounts in real time, track your transactions and at the push of a button create
               a jaw-dropping report.</p>
               <div className={`dualButtonContainer ${sectionStyles.buttonContainer}`}>
                <Link href="/signup" className={sectionStyles.buttonA}>Try it Free</Link>
                <Link href="#" className={sectionStyles.buttonB}>Request a demo</Link>
               </div>
           </div>
           <div className={sectionStyles.containerB}>
               <div className={sectionStyles.containerC}></div>
               <div className={sectionStyles.containerD}></div>
           </div>
        </div>
    )
}

export default SectionA
