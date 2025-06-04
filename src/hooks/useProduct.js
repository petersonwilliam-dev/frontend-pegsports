import api from "../utils/api";
import useFlashMessage from './useFlashMessage'

export default function useProduct() {

    const { setFlashMessage } = useFlashMessage()

    async function getProducts(filters) {
        let filter = '?'
        
        if (filters) {
            Object.keys(filters).map(key => {
                filter += `${key}=${filters[key]}&`
            })
        }

        try {
            const response = await api.get(`/products${filters ? filter : ''}`)
            if (filters.hasProduct) {
                return response.data.hasProduct
            } else {
                return response.data.products
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function getProductById(id) {
        try {
            const response = await api.get(`/products/${id}`)
            return response.data.product
        } catch (err) {
            console.log(err)
        }
    }

    async function createProduct(product, informations, sizes) {

        let msgType = 'success'

        const formData = new FormData()

        Object.keys(product).map(key => {
            if (key === 'images') {
                if (product[key] !== null) {
                    for (let i = 0; i < product[key].length; i++) {
                        formData.append('images', product[key][i])
                    }
                }
            } else {
                formData.append(key, product[key])
            }
        })

        formData.append('informations', JSON.stringify(informations))
        formData.append('available', JSON.stringify(sizes))

        const data = await api.post("/products", formData)
        .then(response => {
            return response.data
        })
        .catch(err => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        
    }

    async function editProduct(product, informations, sizes) {

        let msgType = 'success'

        const formData = new FormData()

        Object.keys(product).map(key => {
            if (key === 'images') {
                if (product[key] !== null) {
                    for (let i = 0; i < product[key].length; i++) {
                        formData.append('images', product[key][i])
                    }
                }
            } else {
                formData.append(key, product[key])
            }
        })

        const informationParsed = informations.map(item => {
            const {_id, ...rest} = item
            return {...rest}
        })

        const availableParsed = sizes.map(item => {
            const {_id, ...rest} = item
            return {...rest, quantity: Number(rest.quantity)}
        })

        formData.append('informations', JSON.stringify(informationParsed))
        formData.append('available', JSON.stringify(availableParsed))

        const data = await api.patch(`/products/${product._id}`, formData)
        .then(response => {
            return response.data
        })
        .catch(err => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

    }

    return {getProducts, getProductById, createProduct, editProduct}
}