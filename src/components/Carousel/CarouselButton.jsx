import styles from './CarouselButton.module.css'

function CarouselButton({icon, action}) {
    return <button className={styles.button} onClick={action}>{icon}</button>
}

export default CarouselButton