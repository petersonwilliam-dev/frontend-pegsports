import { useState } from 'react'
import ProductCard from '../Cards/ProductCard'
import styles from './Carousel.module.css'
import CategoryCard from '../Cards/CategoryCard'

function CarouselItem({maxElementsPerView,maximumRolls, component, elements, id}) {


    const [currentIndex, setCurrentIndex] = useState(0)
    const elementsPerView = maxElementsPerView

    const next = () => {
        if (currentIndex < maximumRolls) {
            setCurrentIndex(currentIndex => currentIndex + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex => currentIndex - 1)
        }
    }

    function renderElements() {
        if (component === "products") {
            return (
                <>
                    {elements.slice(0, 15).map((product, index) => (
                        <ProductCard product={product} key={index}/>
                    ))}
                </>
            )
        } else if (component === 'category') {
            return (
                <>
                    {elements.map((category, index) => (
                        <CategoryCard category={category} key={index} />
                    ))}
                </>
            )
        }
    }

    return (
        <div className='w-100'>
            <div className="position-relative">
                {maximumRolls > 1 && (
                    <div className={styles.prev} style={{left: '-40px'}}>
                        <button onClick={prev}><ion-icon name="chevron-back-outline"></ion-icon></button>
                    </div>
                )}
                <div className={styles.carousel}>
                    <div className={styles.carousel_slide} style={{transform: `translateX(-${currentIndex * (100/elementsPerView)}%)`}} id={id}>
                        {renderElements()}
                    </div>
                </div>
                {maximumRolls > 1 && (
                    <div className={styles.next} style={{right: '-40px'}}>
                        <button onClick={next}><ion-icon name="chevron-forward-outline"></ion-icon></button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CarouselItem