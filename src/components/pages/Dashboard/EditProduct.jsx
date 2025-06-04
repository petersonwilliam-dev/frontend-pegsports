import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import useProduct from "../../../hooks/useProduct"
import FormProduct from "../../Form/FormProduct"

function EditProduct() {

    const {id} = useParams()
    const [product, setProduct] = useState({})
    const {getProductById, editProduct} = useProduct()

    useEffect(() => {
        const fetch = async () => {
            const fetchProduct = await getProductById(id)
            setProduct(fetchProduct)
        }

        fetch()
    }, [id])

    return (
        <div>
            <h4>Editar produto</h4>
            {product.name && (
                <FormProduct productData={product} btnText="Editar produto" handleSubmit={editProduct}/>
            )}
        </div>
    )
}

export default EditProduct