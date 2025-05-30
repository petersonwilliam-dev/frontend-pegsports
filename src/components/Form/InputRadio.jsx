import { Field } from "formik";

import styles from './InputRadio.module.css'

function InputRadio({name, text, value}) {
    return (
        <div className={styles.form_control}>
            <Field type="radio" name={name} id={name} value={value}/>
            <span className={styles.radio_mark}><ion-icon name="checkmark-outline"></ion-icon></span>
            <p>{text}</p>
        </div>
    )
}

export default InputRadio