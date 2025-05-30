import api from "../utils/api";

export default function useProduct() {

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

    return {getProducts, getProductById}
}