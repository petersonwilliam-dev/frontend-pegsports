import styles from './SaleCard.module.css'
import { Link } from 'react-router-dom'

function CardSale({product}) {
    
    return (
        <>
            {product && (
                <Link className={`position-relative ${styles.card_container}`}>
                    <div className={styles.card}>
                        <div className={styles.col_1} style={{backgroundImage: `url(http://localhost:5000/api/v1/products/img/${product.images[0]})`}}></div>
                        <div className={styles.col_2}>
                            <div className={styles.content}>
                                <div>
                                    <h5 className='fs-6'>{product.name}</h5>
                                    <p>De <s>R${product.price.toString().replace('.', ',')}</s> por R${product.price.toString().replace('.', ',')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    )
}

export default CardSale