import { useState, useEffect } from "react"
import bus from "../../utils/bus"

import styles from './FlashMessage.module.css'

function FlashMessage() {

    const [message, setMessage] = useState("")
    const [type, setType] = useState('')
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        bus.addListener('flash', ({message, type}) => {
            setMessage(message)
            setType(type)
            setVisibility(true)

            setTimeout(() => {
                setVisibility(false)
                setMessage('')
                setType('')
            }, 5000)
        })
    }, [])

    return (
        visibility && (
            <div className={`${styles.flash_message} ${styles[type]}`}>
                {type === 'success' && (<p><ion-icon name="checkmark-circle-outline"></ion-icon> {message}</p>)}
                {type === 'error' && (<p><ion-icon name="alert-circle-outline"></ion-icon> {message}</p>)}
            </div>
        )
    )
}

export default FlashMessage