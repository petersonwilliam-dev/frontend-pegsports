import { Field, ErrorMessage } from 'formik'

import styles from './Textarea.module.css'

function Textarea({name, rows, cols, label}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{label}</label>
            <Field as="textarea" name={name} id={name} className="lead fs-6"/>
            <ErrorMessage className="lead" name={name} component="p" styles={{color: 'red'}} />
        </div>
    )
}

export default Textarea