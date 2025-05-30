import { Field } from 'formik'

import styles from './InputSelect.module.css'

function InputSelect({name, options, label}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{label}</label>
            <Field as="select" name={name}>
                <option value="">Selecione</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.name}</option>
                ))}
            </Field>
        </div>
    )
}

export default InputSelect