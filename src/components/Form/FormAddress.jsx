import { Formik, Form } from 'formik'
import axios from 'axios'

import styles from './FormAddress.module.css'
import { useEffect, useState } from 'react'

function FormAddress({addressData, handleSubmit, btnText}) {

    const [address, setAddress] = useState(addressData || {})

    useEffect(() => {
        if (address.cep !== undefined && address.cep.length == 8) {
            axios.get(`${import.meta.env.VITE_API}cep/${address.cep}`)
            .then(response => {
                setAddress(prev => ({
                    ...prev,
                    street: response.data.logradouro,
                    neighborhood: response.data.bairro,
                    city: response.data.localidade,
                    uf: response.data.estado
                }))
            })
            .catch(err => console.log(err))
        }
    }, [address.cep])

    useEffect(() => {
        setAddress(addressData || {})
    }, [addressData])

    function handleOnChange(e) {
        setAddress(prevAddress => ({...prevAddress ,[e.target.name] : e.target.value}))
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(address)
    }

    return (
        <div className={styles.container_form}>
            <form onSubmit={submit}>
                    <div className={styles.form_control}>
                        <label htmlFor="receiver">Destinatário</label>
                        <input name="receiver" type="text" value={address.receiver || ''} onChange={handleOnChange}/>
                    </div>

                    <div className={styles.form_control}>
                        <label htmlFor="street">Rua</label>
                        <input name="street" type="text" value={address.street || ''} onChange={handleOnChange}/>
                    </div>

                    <div className={styles.form_control}>
                        <label htmlFor="number">Número</label>
                        <input name="number" type="text" onChange={handleOnChange} value={address.number || ''} />
                    </div>

                    <div className={styles.form_control}>
                        <label htmlFor="cep">CEP</label>
                        <input name="cep" type="text" onChange={handleOnChange} value={address.cep || ''} />
                    </div>

                    <div className={styles.form_control}>
                        <label htmlFor="neighborhood">Bairro</label>
                        <input name="neighborhood" type="text" value={address.neighborhood || ''} onChange={handleOnChange}/>
                    </div>

                    <div className={styles.form_control}>
                        <label htmlFor="city">Cidade</label>
                        <input name="city" type="text" value={address.city || ''} onChange={handleOnChange} />
                    </div>

                    <div className={styles.form_control}>
                        <label htmlFor="uf">Estado</label>
                        <input name="uf" type="text" value={address.uf || ''} onChange={handleOnChange} />
                    </div>

                    <div className={styles.form_control}>
                        <label htmlFor="phone">Fone para contato</label>
                        <input name="phone" type="text" value={address.phone || ''} onChange={handleOnChange} />
                    </div>

                    <div className={styles.form_control}>
                        <label htmlFor="complement">Complemento</label>
                        <input name="complement" type="text" value={address.complement || ''} onChange={handleOnChange} />
                    </div>

                    <div className={styles.form_control}>
                        <label htmlFor="reference">Referência</label>
                        <input name="reference" type="text" value={address.reference || ''} onChange={handleOnChange} />
                    </div>
                    <button type="submit">{btnText}</button>
                </form>
        </div>
    )
}

export default FormAddress