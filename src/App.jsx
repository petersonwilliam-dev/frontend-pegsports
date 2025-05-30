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

// CONTEXT
import { UserProvider } from './context/UserContext.jsx'
import { CartProvider } from './context/CartContext.jsx'




function App() {

  return (
    <div>
      <UserProvider>
        <CartProvider>
            <Navbar />
            <Container>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/login' element={<Login />}/>
                <Route path="/product/:id" element={<Product />}/>
                <Route path="/search" element={<Search />}/>
                <Route path="/cart" element={<Cart />} />
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="product/add" element={<AddProduct />} />
                </Route>
              </Routes>
            </Container>
        </CartProvider>
      </UserProvider>
      <Footer />
    </div>
  )
}

export default App
