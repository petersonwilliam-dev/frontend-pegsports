import styles from './PurchaseItemCard.module.css'

import { useState } from 'react'

function PurchaseItemCard({item, setPurchaseItem, purchaseItems, setObserverSetQuantity}) {

    const [quantity, setQuantity] = useState(item.quantity)

    function handleQuantity(quantity) {
        if (purchaseItems.some(i => i.item._id === item.item._id)) {
            const index = purchaseItems.findIndex(i => i.item._id === item.item._id)
            purchaseItems[index].quantity = quantity
            setObserverSetQuantity(prev => !prev)
        }
        
    }

    function removeItem() {
        if (purchaseItems.some(i => i.item._id === item.item._id)) {
            setPurchaseItem(prevItems => prevItems.filter(i => i.item._id !== item.item._id))
        }
    }

    return (
        <div className={styles.card}>
            <div>
                <img src={`${import.meta.env.VITE_API}products/img/${item.item.images[0]}`} alt="Card" />
            </div>
            <div className={styles.info}>
                <h4>{item.item.name}</h4>
                <p className={styles.span}>Tamanho: <span>{item.size}</span></p>
                <p>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.item.price)}</p>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className={styles.quantity}>
                        <button className={styles.set} disabled={quantity == 1} onClick={() => {
                            setQuantity(quantity > 1 ? quantity - 1 : 1)
                            handleQuantity(quantity - 1)
                        }}>-</button>
                        <p>{quantity}</p>
                        <button className={styles.set} onClick={() => {
                            setQuantity(quantity + 1)
                            handleQuantity(quantity + 1)
                        }}>+</button>
                    </div>
                    <div>
                        <button className={styles.remove} onClick={removeItem}><ion-icon name="trash-bin-outline"></ion-icon></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseItemCard