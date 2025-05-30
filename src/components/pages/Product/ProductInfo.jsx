import styles from './ProductInfo.module.css'

import RatingsProduct from '../../Rating/RatingsProduct'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRatingMean } from '../../../utils/calcRating'

import { CartContext } from '../../../context/CartContext'

function ProductInfo({product}) {

    const {cart, addItemToCart, removeItemToCart} = useContext(CartContext)
    const [viewAddToCart, setViewAddToCart] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()

    function addToCart() {
        addItemToCart(product, quantity, product.available[indexAvailableQuantity].size)
        setViewAddToCart(false)
    }

    const [indexAvailableQuantity, setIndexAvailableQuantity] = useState(0)

    return (
        <div className={`d-flex flex-column ${styles.product_info}`}>
            <h2>{product.name}</h2>
            <RatingsProduct width={25} mean={getRatingMean(product.ratings)}/>
            <p className={`mt-2 display-6 ${styles.price_product}`}>
                {product.sale ? `Tem promoção` : `${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.price)}`}
            </p>
            <div className={styles.available}>
                <div className="d-flex mb-2">
                    {product.available.length > 1 && (
                        <>
                            {product.available.map((item, index) => (
                                <div key={index} onClick={() => setIndexAvailableQuantity(index)} className={`${styles.available_container} ${indexAvailableQuantity === index ? styles.active : ''}`}>
                                    <p>{item.size}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <p className="lead"><span style={{fontWeight: '600'}}>Disponível:</span> {product.available[indexAvailableQuantity].quantity}</p>
            </div>
            <p>Vendido e entregue por PEG Sports</p>
            <div className={styles.purchase_options}>
                <a href='#'><ion-icon name="bag-check" style={{marginRight: '.5em'}}></ion-icon> Comprar</a>
                {cart ? (
                    <>
                        {cart.products.some(item => item.item._id === product._id) ? (
                            <button onClick={() => removeItemToCart(product)} style={{backgroundColor: '#279d49'}}><ion-icon name="cart-outline" style={{fontSize: '25px'}}></ion-icon><ion-icon name="checkmark-outline"></ion-icon>Remover do carrinho</button>
                        ) : (
                            <button onClick={() => setViewAddToCart(prevView => !prevView)} style={{backgroundColor: '#fcbd18'}}><ion-icon name="cart-outline" style={{fontSize: '25px'}}></ion-icon><ion-icon name="add-outline" style={{marginRight: '.5em'}}></ion-icon>Adicionar ao carrinho</button>
                        )}  
                    </>
                ): (
                    <button onClick={() => navigate("/login", {replace: true})} style={{backgroundColor: '#fcbd18'}}><ion-icon name="cart-outline" style={{fontSize: '25px'}}></ion-icon><ion-icon name="add-outline" style={{marginRight: '.5em'}}></ion-icon>Adicionar ao carrinho</button>
                )}
                {viewAddToCart && (
                    <div className={styles.add_item_to_cart}>
                        <div>
                            <button className={styles.set} onClick={() => quantity > 1 ? setQuantity(prevQuantity => prevQuantity - 1) : null}>-</button>
                            <p>{quantity}</p>
                            <button className={styles.set} onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</button>
                        </div>
                        <div>
                            <button className={styles.add} onClick={() => addToCart()}>Adicionar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductInfo