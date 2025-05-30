import sunrise from '../../assets/img/sunrise.jpg'
import sky from '../../assets/img/sky.jpg'

// CSS
import styles from './Carousel.module.css'
import { useState } from 'react'

function Carousel() {

    const images = [sunrise, sky]

    const [currentImage, setCurrentImage] = useState(0)

    const prevImage = () => setCurrentImage(currentImage => currentImage > 0 ? currentImage - 1 : images.length - 1)
    const nextImage = () => setCurrentImage(currentImage => currentImage < (images.length - 1) ? currentImage + 1 : 0)
    
    return (
        <div className="w-100">
            <div className="position-relative d-flex">
                <div className={styles.prev} style={{left: '0'}}>
                    <button onClick={prevImage}><ion-icon name="chevron-back-outline"></ion-icon></button>
                </div>
                <div className={styles.carousel}>
                    <div className={styles.carousel_slide} style={{ transform: `translateX(-${currentImage * 100}%)`}}>
                        {images.map((image, index) => (
                            <img src={image} key={index} alt="Image Carousel" className={`img-fluid ${styles.img_carousel}`} />
                        ))}
                    </div>
                </div>
                <div className={styles.next} style={{right: '0'}}>
                    <button onClick={nextImage}><ion-icon name="chevron-forward-outline"></ion-icon></button>
                </div>
            </div>
        </div>
    )
}

export default Carousel