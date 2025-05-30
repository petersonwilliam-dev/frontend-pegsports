import styles from './Input.module.css'
import { Field, ErrorMessage } from 'formik'


function Input({name, placeholder, type, label}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{label}</label>
            <Field type={type} name={name} id={name} placeholder={placeholder} className="lead fs-6"/>
            <ErrorMessage className="lead" name={name} component="p" styles={{color: 'red'}} />
        </div>
    )
}

export default Input