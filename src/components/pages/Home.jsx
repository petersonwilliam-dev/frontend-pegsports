import { useEffect, useState } from "react"
import categorys from '../../assets/consts/categorys'

import SaleCard from "../Cards/SaleCard"
import CarouselImage from "../Carousel/CarouselImage"
import CarouselItem from "../Carousel/CarouselItem"
import styles from './Home.module.css'

// HOOKS
import useProducts from '../../hooks/useProduct'

function Home() {

    const [newsProducts, setNewsProducts] = useState([])

    const {getProducts} = useProducts()

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchNewsProducts = await getProducts({sort: true})
            setNewsProducts(fetchNewsProducts)
        }
        fetchProducts()
    }, [])

    return (
        <section>
            <CarouselImage />
            <div className={`${styles.container_home} w-100`}>
                <div id="entry">
                    <h3>Novidades</h3>
                    <div className="d-flex">
                        <CarouselItem id="carousel_products" maximumRolls={2} component="products" maxElementsPerView={1} elements={newsProducts}/>
                    </div>
                </div>
                <div id="categorys" className="text-center">
                    <h3>Veja por categorias</h3>
                    <CarouselItem id="carousel_category" maximumRolls={0} component="category" maxElementsPerView={5} elements={categorys}/>
                </div>
                <div id="sales">
                    <h3 className={`text-center py-3 ${styles.title}`}>Promoções</h3>
                    <div className={styles.sales_container}>
                        {newsProducts.slice(0, 8).map((product, index) => (
                            <SaleCard key={index} product={product}/>
                        ))}
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default Home