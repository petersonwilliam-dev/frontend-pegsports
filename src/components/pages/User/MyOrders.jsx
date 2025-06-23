import { useState, useEffect } from 'react'
import useBuy from '../../../hooks/useBuy'

import styles from './MyOrders.module.css'

import OrderCard from '../../Cards/OrderCard'

function MyOrders() {

    const { getBuys } = useBuy()
    const [orders, setOrders] = useState([])

    useEffect(() => {

        const fetchOrders = async () => {
            const userOrders = await getBuys()
            setOrders(userOrders)
        }

        fetchOrders()
    }, [])

    console.log(orders)

    return (
        <div className={styles.my_orders}>
            <h4>Minhas compras</h4>
            {orders.map(order => (
                <OrderCard key={order._id} />
            ))}
        </div>
    )
}

export default MyOrders