import styles from './OverallRating.module.css'

import { getPercentageRating, getRatingMean } from '../../utils/calcRating'

import RatingsProduct from './RatingsProduct'

function OverallRating({ratings}) {

    const {fivePercentage, fiveStars, fourPercentage, fourStars, threePercentage, threeStars, twoPercentage, twoStars, onePercentage, oneStar} = getPercentageRating(ratings)

    return (
        <div>
            <h4 className="display-6">Avaliações dos clientes</h4>
            <RatingsProduct width={35} mean={getRatingMean(ratings)}/>
            <p>{ratings.length} avaliações</p>
            <div >
                <div className={styles.container}>
                    <h6 className="m-0">5 estrelas</h6>
                    <div className="d-flex align-items-center">
                        <div className={styles.container_percentage}>
                            <div className={styles.percentage_bar} style={{width: `${fivePercentage}%`}}></div>
                        </div>
                        <span>{fiveStars}</span>
                    </div>
                </div>
                <div className={styles.container}>
                    <h6 className="m-0">4 estrelas</h6>
                    <div className="d-flex align-items-center">
                        <div className={styles.container_percentage}>
                            <div className={styles.percentage_bar} style={{width: `${fourPercentage}%`}}></div>
                        </div>
                        <span>{fourStars}</span>
                    </div>
                </div>
                <div className={styles.container}>
                    <h6 className="m-0">3 estrelas</h6>
                    <div className="d-flex align-items-center">
                        <div className={styles.container_percentage}>
                            <div className={styles.percentage_bar} style={{width: `${threePercentage}%`}}></div>
                        </div>
                        <span>{threeStars}</span>
                    </div>
                </div>
                <div className={styles.container}>
                    <h6 className="m-0">2 estrelas</h6>
                    <div className="d-flex align-items-center">
                        <div className={styles.container_percentage}>
                            <div className={styles.percentage_bar} style={{width: `${twoPercentage}%`}}></div>
                        </div>
                        <span>{twoStars}</span>
                    </div>
                </div>
                <div className={styles.container}>
                    <h6 className="m-0">1 estrelas</h6>
                    <div className="d-flex align-items-center">
                        <div className={styles.container_percentage}>
                            <div className={styles.percentage_bar} style={{width: `${onePercentage}%`}}></div>
                        </div>
                        <span>{oneStar}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverallRating