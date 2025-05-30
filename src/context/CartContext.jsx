import { createContext } from "react";
import useCart from "../hooks/useCart";

const CartContext = createContext()

function CartProvider({children}) {

    const {cart, addItemToCart, removeItemToCart, getCart} = useCart()

    return (
        <CartContext.Provider value={{cart, addItemToCart, removeItemToCart, getCart}}>
            {children}
        </CartContext.Provider>
    )
}

export {CartContext, CartProvider}