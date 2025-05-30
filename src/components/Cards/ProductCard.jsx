import { getRatingMean } from '../../utils/calcRating'

// CSS
import styles from './ProductCard.module.css'
import RatingsProduct from "../Rating/RatingsProduct"

function CardProduct({product}) {
    
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