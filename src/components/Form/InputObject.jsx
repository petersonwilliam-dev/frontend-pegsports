import { useEffect, useState } from 'react'

import styles from './InputObject.module.css'

function InputObject({id, setList, list, amount, setAmount, textTitle, textValue, keyObject, valueObject, object, index}) {

    const [title, setTitle] = useState(object ? object[keyObject] : '')
    const [value, setValue] = useState(object ? object[valueObject] : '')

    function addInformation() {
        if (!list.some(i => i._id == id)) {
            const newITem = {_id: id, [keyObject]: title, [valueObject]: value}
            setList([...list, newITem])
        } else {
            const index = list.findIndex(i => i._id === id)
            list[index][keyObject] = title
            list[index][valueObject] = value
        }
    }

    function removeInformation() {
        if (list.some(info => info._id == id)) {
            setList(prevList => prevList.filter(i => i._id !== id))
        }
        setAmount(prev => prev - 1)
    }

    useEffect(() => {
        addInformation()
    }, [title, value])

    return (
        <div className={styles.form_control}>
            <div className={styles.title}>
                <label htmlFor={`title${id}`}>{textTitle}</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
            </div>
            <div className={styles.value}>
                <label htmlFor={`value${id}`}>{textValue}</label>
                <input type="text" onChange={(e) => setValue(e.target.value)} value={value}/>
            </div>
            <div className={styles.actions}>
                {(index == (amount - 1)) && (
                    <button type='button' className={styles.remove} onClick={removeInformation}><ion-icon name="trash-outline"></ion-icon></button>
                )}
            </div>
        </div>
    )
}

export default InputObject