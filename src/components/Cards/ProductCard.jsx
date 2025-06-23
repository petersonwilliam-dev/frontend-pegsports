import { getRatingMean } from '../../utils/calcRating'
import useFreight from '../../hooks/useFreight'

// CSS
import styles from './ProductCard.module.css'
import RatingsProduct from "../Rating/RatingsProduct"
import { useEffect } from 'react'

function CardProduct({product}) {

    const { getFreight } = useFreight()

    useEffect(() => {
        getFreight('01001000', '58297000', product)
    }, [])
    
    return (
        <>
            {product && (
                <div className={styles.card}>
                    <a href={`/product/${product._id}`} className={styles.card_link}>
                        <div className={styles.card_image}>
                            <img src={`http://localhost:5000/api/v1/products/img/${product.images[0]}`} alt={product.name} />
                        </div>
                        <div className={styles.card_content}>
                            <h6 className="text-truncate">{product.name}</h6>
                            <RatingsProduct width={15} mean={getRatingMean(product.ratings)}/>
                            <h6>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.price)}</h6>
                        </div>
                    </a>
                </div>
            )}
        </>
    )
}

export default CardProduct