import styles from './InputFile.module.css'

function InputFile({name, label, multiple, setPreviews, setField}) {

    function onChangeFile(e) {
        const files = Array.from(e.target.files)
        setPreviews(files)
        setField('images', files)
    }

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{label}</label>
            <input type="file" name={name} id={name} multiple={multiple} onChange={onChangeFile} />
        </div>
    )
}

export default InputFile