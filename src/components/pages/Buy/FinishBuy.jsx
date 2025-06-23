import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import useProduct from "../../../hooks/useProduct"

import translate from "../../../utils/translate"

import styles from './FinishBuy.module.css'

import CarouselItem from '../../Carousel/CarouselItem'
import OrderCard from "../../Cards/OrderCard"

function FinishBuy() {

    const { getProducts } = useProduct()

    const location = useLocation()
    const [buys, setBuys] = useState(location.state?.buys || null)
    const [relatedProducts, setRelatedProducts] = useState([])
    
    useEffect(() => {
        let category = ''

        buys.map((buy, index) => {
            if (index < buys.length - 1) {
                category += `${buy.product.item.category},`
            } else {
                category += buy.product.item.category
            }
        })

        const fetchProducts = async () => {
            const fetchRelatedProducts = await getProducts({category, limit: 15})
            setRelatedProducts(fetchRelatedProducts)
        }

        fetchProducts()
    }, [buys, location.state])

    return (
        <section>
            <h2>Pedido realizado com sucesso</h2>
            <div className={styles.orders}>
                {buys.map(buy => (
                    <OrderCard order={buy}/>
                ))}
            </div>
        </section>
    )
}

export default FinishBuy