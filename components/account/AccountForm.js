import newAccountStyles from '../../styles/components/NewAccount.module.css'
import { useState } from 'react'

const NewAccount = ({exit, name}) => {

    const [currentName, setCurrentName] = useState(name.length > 0 ? name : '')

    function handleSubmit(e) {
        e.preventDefault()
        console.log(currentName)
        exit()
    }

    const handleChange = (e) => {
        setCurrentName(e.target.value)
    }

    function handleCancel(){
        exit()
    }
    
    return (
            <form className={newAccountStyles.form} onSubmit={handleSubmit} >
                <label className={newAccountStyles.label} htmlFor='formName'>Name</label><br/>
                <input className={newAccountStyles.text} name='formName' value={currentName}  onChange={(e) => handleChange(e)}></input><br/>
                <input type='button' value='Cancel' onClick={handleCancel} className={newAccountStyles.cancel}></input> 
                <input type='submit'className={newAccountStyles.submit}></input>
            </form>
    )
}

export default NewAccount
