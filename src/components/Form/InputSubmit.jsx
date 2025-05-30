import styles from './Input.module.css'

function InputSubmit({value}) {
    return (
        <div className={styles.form_control}>
            <button type="submit" >{value}</button>
        </div>
    )
}

export default InputSubmit