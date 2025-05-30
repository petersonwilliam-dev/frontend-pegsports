import RatingsProduct from './RatingsProduct'
import styles from './UserReview.module.css'

import { Link } from 'react-router-dom'

function UserReview({ratings}) {

    return (
        <div className={styles.container_review}>
            {ratings.length > 0 ? (
                <>
                    {ratings.slice(0, 3).map((rating, index) => (
                        <div className={styles.review} key={index}>
                            <div className={styles.user}>
                                <ion-icon name="person-circle"></ion-icon>
                                <p>{rating.user.name}</p>
                            </div>
                            <div>
                                <RatingsProduct width={15} grade={rating.grade}/>
                            </div>
                            <div>
                                <p>{rating.comment}</p>
                            </div>
                        </div>
                    ))}
                    {ratings.length > 3 && (
                        <Link className={styles.show_all}>
                            <ion-icon name="chevron-down-outline"></ion-icon> Mostrar todas avaliações
                        </Link>
                    )} 
                </>
            ) : (
                <>
                    <p className={styles.empty}>Não há avaliações</p>
                </>
            )}
        </div>
        
    )
}

export default UserReview