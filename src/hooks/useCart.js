import { useEffect, useState } from "react";
import api from "../utils/api";

export default function useCart() {

    const [cart, setCart] = useState()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            getCart()
        }
    }, [])

    async function getCart() {
        try {
            const response = await api.get("/cart")
            setCart(response.data.cart)
        } catch (err) {
            console.log(err)
        }
    }

    async function addItemToCart(product, quantity, size) {

        const datas = {
            quantity,
            size
        }

        try {
            await api.patch(`/cart/${product._id}`, datas)
            const newItem = {item: product, quantity, size}
            setCart(prevCart => ({
                ...prevCart,
                products: [...prevCart.products, newItem]
            }))
        } catch (err) {
            console.log(err)
        }
    }

    async function removeItemToCart(product) {
        try {
            await api.delete(`/cart/${product._id}`)
            setCart(prevCart => ({
                ...prevCart,
                products: prevCart.products.filter(p => p.item._id !== product._id),
            }))
        } catch (err) {
            console.log(err)
        }
    }

    return {getCart, addItemToCart, removeItemToCart, cart}
}