import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useProduct from "../../../hooks/useProduct"

// CSS
import styles from './Product.module.css'

// COMPONENTS
import ProductInfo from "./ProductInfo"
import OverallRating from "../../Rating/OverallRating"
import TableInformations from "../../Table/TableInformations"
import UserReview from "../../Rating/UserReview"
import CarouselItem from '../../Carousel/CarouselItem'

function Product() {

    const {getProducts, getProductById} = useProduct()
    const [product, setProduct] = useState(null)
    const [commonProducts, setCommonProducts] = useState([])
    const [currentImage, setCurrentImage] = useState(0)
    const {id} = useParams()

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchProduct = await getProductById(id)
            const fetchCommonProducts = await getProducts({category: fetchProduct.category})
            setProduct(fetchProduct)
            setCommonProducts(fetchCommonProducts)
        }

        fetchProducts()
    }, [id])

    return (
        <section>
            {product && (
                <>
                    <div className="row">
                        <div className={`col-1 p-2 d-flex flex-column ${styles.images_product}`}>
                            {product.images.map((image, index) => (
                                <img key={index} src={`http://localhost:5000/api/v1/products/img/${image}`} alt="" onClick={() => setCurrentImage(index)}/>
                            ))}
                        </div>
                        <div className="col-5 d-flex align-items-center justify-content-center">
                            <div className={`w-100 ${styles.image}`}>
                                <img src={`http://localhost:5000/api/v1/products/img/${product.images[currentImage]}`} alt=""/>
                            </div>
                        </div>
                        <div className="col-6">
                            <ProductInfo product={product}/>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <h4 className="display-6">Descrição</h4>
                        <p className="lead">{product.description}</p>
                    </div>
                    <div className={styles.informations}>
                        <h4 className="display-6">
                            Informações do produto
                        </h4>
                        <TableInformations informations={product.informations}/>
                    </div>
                    <div className={styles.container_ratings}>
                        <OverallRating ratings={product.ratings}/>
                        <UserReview ratings={product.ratings}/>
                    </div>
                    <div className="my-5">
                        <h4>Produtos em comum</h4>
                        <CarouselItem elements={commonProducts} component="products" id="commonProducts" />
                    </div>
                </>
            )}
        </section>
    )
}

export default Product