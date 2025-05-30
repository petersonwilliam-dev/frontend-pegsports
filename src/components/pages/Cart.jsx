import { useState, useEffect, useContext } from "react"

import { CartContext } from "../../context/CartContext"

import CartItemCard from "../Cards/CartItemCard"

import styles from './Cart.module.css'

function Cart() {

    const {cart, removeItemToCart} = useContext(CartContext)
    const [maxValue, setMaxValue] = useState(0)
    const [purchaseItems, setPurchaseItems] = useState([])
    const [observerSetQuantity, setObserverSetQuantity] = useState(false)

    useEffect(() => {
        console.log(purchaseItems)
        let value = 0
        purchaseItems.map(item => {
            value += (item.item.price * item.quantity)    
        })
        setMaxValue(value)
    }, [purchaseItems, observerSetQuantity])

    return (
        <section>
            {cart && (
                <div className={styles.container}>
                    <div className={styles.container_items}>
                        {cart && (
                            <>
                                {cart.products.map((item, index) => (
                                    <CartItemCard key={index} item={item} setPurchaseItems={setPurchaseItems} setObserverSetQuantity={setObserverSetQuantity} purchaseItems={purchaseItems}/>
                                ))}
                            </>
                        )}
                    </div>
                    <div className={styles.purchase_info}>
                        <h3>Subtotal {purchaseItems.length > 0 && (<span>({purchaseItems.length} produtos)</span>)}</h3>
                        <h4>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(maxValue)}</h4>
                        <button>Finalizar pedido</button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Cart