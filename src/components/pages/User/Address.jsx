import { useContext, useState } from "react"
import useAddress from "../../../hooks/useAddress"

import { Context } from "../../../context/UserContext"

import styles from './Address.module.css'

import FormAddress from "../../Form/FormAddress"

function Address() {
    
    const {user} = useContext(Context)
    const [addressForm, setAddressForm] = useState(null)
    const {addAddress, addresses, editAddress, removeAddress} = useAddress()

    return (
        <div className={styles.container_addresses}>
            <div>
                {user && (
                    <>
                        {addresses.map((address, index) => (
                            <div className={styles.address} key={index}>
                                <div className="mx-1">
                                    <ion-icon name="location-outline"></ion-icon>
                                </div>
                                <div>
                                    <p className={styles.receiver}>{address.receiver}</p>
                                    <p>{address.phone}</p>
                                    <p >{address.street}, {address.number}, {address.neighborhood}, {address.city}, {address.uf}, {address.cep}, {address.complement}, {address.reference}.</p>
                                    <div className={styles.action}>
                                        <button className={styles.edit} onClick={() => setAddressForm(address)}><ion-icon name="pencil-outline"></ion-icon> Editar</button>
                                        <button className={styles.delete} onClick={() => removeAddress(address._id)}><ion-icon name="trash-bin-outline"></ion-icon> Remover</button>
                                    </div>
                                </div>
                            </div>
                        )) }
                    </>
                    
                )}
                <button className={styles.add_address} onClick={() => setAddressForm(null)}><ion-icon name="add-outline"></ion-icon>Adicionar endereço</button>
            </div>
            <div className={styles.container_form_address}>
                <h4>{addressForm ? "Editar endereço" : "Adicionar endereço"}</h4>
                {addressForm ? (
                    <FormAddress addressData={addressForm} handleSubmit={editAddress} btnText="Editar" />
                ) : (
                    <FormAddress handleSubmit={addAddress} btnText="Cadastrar" />
                )}
            </div>
        </div>
    )
}

export default Address