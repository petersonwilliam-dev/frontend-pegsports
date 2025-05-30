import { useState } from 'react'

import styles from './InputObject.module.css'

function InputObject({id, setList, list, amount, setAmount, textTitle, textValue, keyObject, valueObject}) {

    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')

    function addInformation() {
        if (!list.some(i => i.id == id) && title !== '' && value !== '') {
            const newITem = {id, [keyObject]: title, [valueObject]: value}
            setList([...list, newITem])
        } else {
            const index = list.findIndex(i => i.id === id)
            list[index][keyObject] = title
            list[index][valueObject] = value
        }
    }

    function removeInformation() {
        if (list.some(info => info.id == id)) {
            setList(prevList => prevList.filter(i => i.id !== id))
        }
        setAmount(prev => prev - 1)
    }

    return (
        <div className={styles.form_control}>
            <div className={styles.title}>
                <label htmlFor={`title${id}`}>{textTitle}</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className={styles.value}>
                <label htmlFor={`value${id}`}>{textValue}</label>
                <input type="text" onChange={(e) => setValue(e.target.value)}/>
            </div>
            <div className={styles.actions}>
                <button type="button" className={styles.add} onClick={addInformation}><ion-icon name="add-outline"></ion-icon></button>
                {(id == (amount - 1)) && (
                    <button type='button' className={styles.remove} onClick={removeInformation}><ion-icon name="trash-outline"></ion-icon></button>
                )}
            </div>
        </div>
    )
}

export default InputObject