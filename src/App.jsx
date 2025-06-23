import {Routes, Route} from 'react-router-dom'

// Components
import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// PAGES
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Product from './components/pages/Product/Product.jsx'
import Search from './components/pages/Search.jsx'
import Cart from './components/pages/Cart.jsx'
import Dashboard from './components/pages/Dashboard/Dashboard.jsx'
import AddProduct from './components/pages/Dashboard/AddProduct.jsx'
import ListProducts from './components/pages/Dashboard/ListProducts.jsx'
import EditProduct from './components/pages/Dashboard/EditProduct.jsx'
import Profile from './components/pages/User/Profile.jsx'
import Address from './components/pages/User/Address.jsx'
import Buy from './components/pages/Buy/Buy.jsx'
import FinishBuy from './components/pages/Buy/FinishBuy.jsx'
import MyOrders from './components/pages/User/MyOrders.jsx'

// CONTEXT
import { UserProvider } from './context/UserContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import FlashMessage from './components/FlashMessage/FlashMessage.jsx'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY)

function App() {

  return (
    <div>
      <UserProvider>
        <CartProvider>
            <Navbar />
            <FlashMessage />
            <Container>
              <Elements stripe={stripePromise}>
                <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path='/register' element={<Register />}/>
                  <Route path='/login' element={<Login />}/>
                  <Route path="/product/:id" element={<Product />}/>
                  <Route path="/search" element={<Search />}/>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="product/add" element={<AddProduct />} />
                    <Route path='product/table' element={<ListProducts />} />
                    <Route path='product/edit/:id' element={<EditProduct />} />
                  </Route>
                  <Route path="/profile" element={<Profile />} >
                    <Route path="address" element={<Address />} />
                    <Route path="myorders" element={<MyOrders />} />
                  </Route>
                  <Route path='/buy' element={<Buy />} />
                  <Route path="/finishbuy" element={<FinishBuy />} />
                </Routes>
              </Elements>
            </Container>
        </CartProvider>
      </UserProvider>
      <Footer />
    </div>
  )
}

export default App
