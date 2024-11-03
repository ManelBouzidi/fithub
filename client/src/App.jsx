import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FrontOfficeLayout from './layouts/FrontOfficeLayout'
import Home from './home/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import AdminDashbord from './components/admin-dashbord/AdminDashbord'
import Product from './components/Product'
import OneProduct from './components/OneProduct'
import Cart from './components/Cart'
import { ThemeProvider } from '@mui/material/styles'
import Theme from './components/Theme'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Routes>
          <Route path="/" element={<FrontOfficeLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Product />} />
            <Route path="product/:productId" element={<OneProduct />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/*" element={<AdminDashbord />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
