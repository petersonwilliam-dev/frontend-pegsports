import styles from './CategoryCard.module.css'
import { Link } from 'react-router-dom'

function CardCategory({category}) {

    return (
        <Link to={`/search?category=${category.value}`} className={styles.card_container}>
            <img src={category.urlImage} alt="" />
            <p className="lead">{category.name}</p>
        </Link>
    )
}

export default CardCategory