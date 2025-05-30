import { useState } from 'react'
import styles from './CartItemCard.module.css'


function CartItemCard({item, setPurchaseItems, purchaseItems, setObserverSetQuantity}) {

    const [quantity, setQuantity] = useState(item.quantity)
    const [checked, setChecked] = useState(false)

    function setPurchaseItemsCart() {

        setChecked(!checked)

        setPurchaseItems(prevPurchaseItems => {
            if (!checked) {
                if (!prevPurchaseItems.some(i => i.item._id === item.item._id)) {
                    return [...prevPurchaseItems, {...item, quantity}]
                }
            } else {
                return prevPurchaseItems.filter(i => !(i.item._id === item.item._id))
            }
        })
    }

    function handleQuantity(quantity) {
        if (purchaseItems.some(i => i.item._id === item.item._id)) {
            const index = purchaseItems.findIndex(i => i.item._id === item.item._id)
            purchaseItems[index].quantity = quantity
            setObserverSetQuantity(prev => !prev)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.select_item}>
                <input type="checkbox" onChange={setPurchaseItemsCart} checked={checked} />
                <span className={styles.check_mark}><ion-icon name="checkmark-outline"></ion-icon></span>
            </div>
            <div className={styles.card}>
                <div className={styles.image}>
                    <img src={`${import.meta.env.VITE_API}products/img/${item.item.images[0]}`} alt="" />
                </div>
                <div className={styles.item_content}>
                    <div className={styles.item_info}>
                        <h4>{item.item.name}</h4>
                        <p>Tamanho: <span>{item.size}</span></p>
                    </div>
                    <div className={styles.options}>
                        <div className={styles.quantity}>
                            <button className={styles.set} onClick={() => {
                                setQuantity(prev => prev > 1 ? prev - 1 : 1)
                                handleQuantity(quantity - 1)
                            }} disabled={quantity > 1 ? false : true}>-</button>
                            <p>{quantity}</p>
                            <button className={styles.set} onClick={() => {
                                setQuantity(prevQuantity => prevQuantity + 1)
                                handleQuantity(quantity + 1)
                            }}>+</button>
                        </div>
                        <div className={styles.price}>
                            <p>
                                {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.item.price * quantity)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard