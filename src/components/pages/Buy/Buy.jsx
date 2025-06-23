import { useLocation } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import useBuy from "../../../hooks/useBuy"

import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import styles from './Buy.module.css'
import pix from '../../../assets/img/pix.png'
import card from '../../../assets/img/card.png'

import { Context } from "../../../context/UserContext"
import PurchaseItemCard from "../../Cards/PurchaseItemCard"
import FormAddress from '../../Form/FormAddress'
import ModalCard from "../../Modal/ModalCard"

function Buy() {

    const { user } = useContext(Context)
    const {createBuy} = useBuy()

    const [addresses, setAddresses] = useState([])
    const [changeAddress, setChangeAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const location = useLocation()
    const [buyIntention, setBuyIntention] = useState(location.state?.productsPurchaseIntention || [])
    const [observerQuantity, setObserverQuantity] = useState(false)


    useEffect(() => {
        setAddresses(user && user.addresses ? user.addresses : {})
    }, [user])


    function getTotalValue() {
        let total = 0
        buyIntention.map(item => {
            total += item.item.price * item.quantity
        })

        return total
    }
 
    async function finishBuy() {
        createBuy(buyIntention, selectedAddress)
    }
    
    function onChangeAddress(address) {
        setSelectedAddress(address)
        setChangeAddress(false)
    }

    return (
        <section>
            <div className={styles.container}>
                <div className={styles.purchase_details}>
                    <h3>Endereço</h3>
                        {selectedAddress && (
                            <div className={`${styles.select} `} style={{cursor: 'pointer', backgroundColor: '#eee'}}>
                                <div className={styles.address}>
                                    <div>
                                        <ion-icon name="location-outline"></ion-icon>
                                    </div>
                                    <div>
                                        <p className={styles.receiver}><span>{selectedAddress.receiver}</span></p>
                                        <p>{selectedAddress.phone}</p>
                                        <p >{selectedAddress.street}, {selectedAddress.number}, {selectedAddress.neighborhood}, {selectedAddress.city}, {selectedAddress.uf}, {selectedAddress.cep}, {selectedAddress.complement}, {selectedAddress.reference}.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {addresses.length > 0 && (
                            <>
                                {addresses.map((address, index) => (
                                    <div key={index}>
                                        {(!selectedAddress || !selectedAddress._id || (selectedAddress._id !== address._id)) && (
                                            <div className={styles.select} style={{cursor: 'pointer'}} key={index} onClick={() => setSelectedAddress(address)}>
                                                <div className={styles.address}>
                                                    <div>
                                                        <ion-icon name="location-outline"></ion-icon>
                                                    </div>
                                                    <div>
                                                        <p className={styles.receiver}><span>{address.receiver}</span></p>
                                                        <p>{address.phone}</p>
                                                        <p >{address.street}, {address.number}, {address.neighborhood}, {address.city}, {address.uf}, {address.cep}, {address.complement}, {address.reference}.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {changeAddress && (
                                    <div className={styles.select}>
                                        <h4>Alterar endereço</h4>
                                        <FormAddress btnText="Mudar" handleSubmit={onChangeAddress} />
                                    </div>
                                )}
                            </>
                        )}
                    <div className={styles.change_address}>
                        <a onClick={() =>  setChangeAddress(true)}>Alterar</a>
                        {changeAddress && <a onClick={() =>  setChangeAddress(false)}>Cancelar</a>}
                    </div>
                    <h3>Método de pagamento</h3>
                    <div className={styles.select}>
                            <div className={styles.container_method}>
                                <div className={styles.select_item}>
                                    <input type="radio" name="method" />
                                    <span className={styles.check_mark}><ion-icon name="checkmark-outline"></ion-icon></span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <img src={card} alt="Pix" />
                                    <span >Cartão</span>
                                    <p>Pague usando seu cartão de crédito ou débito</p>
                                    <button className={styles.add_card} data-bs-toggle="modal" data-bs-target="#modalCard">Adicionar cartão</button>
                                </div>
                            </div>
                    </div>
                    <h3>Revise os produtos</h3>
                    <div className={styles.review_products}>
                        {buyIntention.length > 0 ? buyIntention.map(item => (
                            <PurchaseItemCard key={item.item._id} item={item} purchaseItems={buyIntention} setPurchaseItem={setBuyIntention} setObserverSetQuantity={setObserverQuantity}/>
                        )) : (
                            <div className="w-100 text-center py-4">
                                <p className="display-6 text-secondary">Não há produtos para a compra</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.container_finish_buy}>
                    <div className={styles.finish_buy}>
                        <div className="d-flex justify-content-between">
                            <p>Itens:</p>
                            <p>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(getTotalValue())}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Frete e manuseio:</p>
                            <p>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(getTotalValue())}</p>
                        </div>
                        <div className={`d-flex justify-content-between ${styles.total}`}>
                            <p>Total do pedido:</p>
                            <p>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(getTotalValue())}</p>
                        </div>
                    </div>
                    <div className="w-100 text-center">
                        <button className={styles.conclude_buy} onClick={finishBuy}>Finalizar compra</button>
                    </div>
                </div>
            </div>
            <ModalCard />
        </section>
    )
}

export default Buy