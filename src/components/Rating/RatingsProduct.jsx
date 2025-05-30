import styles from './RatingsProduct.module.css'

function RatingsProduct({width, mean, grade}) {

    let fullStars = 0
    let hasHalfStar = false
    let remainingStars = 5
    let value = 0

    if (mean) {
        fullStars = Math.floor(mean)
        hasHalfStar = mean - fullStars >= 0.5;
        remainingStars -=  fullStars + (hasHalfStar ? 1 : 0)
        value = mean
    } else if (grade) {
        fullStars = grade
        remainingStars -= grade
        value = grade
    }

    return (
        <div className={styles.ratings}>
            {[...Array(fullStars)].map((_, index) => (
                <ion-icon key={index} name="star" style={{fontSize: `${width}px`}}></ion-icon>
            ))}
            {[...Array(hasHalfStar ? 1 : 0)].map((_, index) => (
                <ion-icon key={index} name="star-half" style={{fontSize: `${width}px`}}></ion-icon>
            ))}
            {[...Array(remainingStars)].map((_, index) => (
                <ion-icon key={index} name="star" style={{fontSize: `${width}px`, color: 'gray'}}></ion-icon>
            ))}
            <p className="lead m-0" style={{fontSize: `${width}px`}}>{value.toFixed(1)}</p>
        </div>
    )
}

export default RatingsProduct