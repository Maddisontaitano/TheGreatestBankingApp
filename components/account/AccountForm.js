    import newAccountStyles from '../../styles/components/NewAccount.module.css'
import styles from '../../styles/components/Form.module.css'
import { useState } from 'react'
// import dog from '../../pages/api/accounts/edit-account-nickname'

const NewAccount = ({exit, formData}) => {

    const [currentName, setCurrentName] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`../../api/accounts/edit-account-nickname?id=${formData.accountId}&nickname=${currentName}`)
        exit()
    }

    const handleChange = (e) => {
        setCurrentName(e.target.value)
    }

    function handleCancel(e){
        e.preventDefault()
        exit()
    }
    
    return (
            <form className={`${newAccountStyles.form} ${newAccountStyles.formPlacement}`} onSubmit={handleSubmit} >
                <h1 className={newAccountStyles.title}>Add Nickname</h1>
                <div className={styles.inputContainer}>
                    <label htmlFor="formName">
                    <h3 className={styles.label}>Name</h3>
                    </label>
                    <input
                        id="email"
                        className={styles.input}
                        type="text"
                        name="formName"
                        placeholder="Purple Account"
                        value={currentName}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button type='submit'className={newAccountStyles.submit}>Submit</button>
                <button type='button' value='Cancel' onClick={handleCancel} className={newAccountStyles.cancel}>Cancel</button> 
            </form>
    )
}

export default NewAccount