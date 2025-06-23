import styles from './OrderCard.module.css'

import translate from '../../utils/translate'
import { format } from 'date-fns'
import { ptBR } from "date-fns/locale"

function OrderCard({order}) {
    console.log(order)
    return (
        <div className={styles.card}>
            <div className="d-flex p-4">
                <div className={styles.image}>
                    <img src={`${import.meta.env.VITE_API}products/img/${order.product.item.images[0]}`} alt="" />
                </div>
                <div className={styles.details}>
                    <h4>{order.product.item.name}</h4>
                    <p><span>Código do pedido: </span> {order._id}</p>
                    <p><span>Status do pedido: </span>{translate(order.status)}</p>
                    <p><span>Feito em: </span>{format(new Date(order.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss", {locale: ptBR})}</p>
                    <p><span>Quantidade: </span> {order.product.quantity}</p>
                </div>
            </div>
            <div className={styles.total_value}>
                <p>Total: {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(order.value.productValue + order.value.shippingCost)}</p>
            </div>
        </div>
    )
}

export default OrderCard