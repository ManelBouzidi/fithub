import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './home/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UpProfile from './components/UpProfil';
import AdminDashbord from './components/admin-dashbord/AdminDashbord';
import OneProduct from './components/OneProduct';
import Theme from './components/Theme';
import { isAuthenticated as authCheck, isAdmin } from './auth';
import Products from './components/Product';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authCheck);

  const setIsAuth = (value) => {
    setIsAuthenticated(value);
  };

  const Nav = () => {
    const location = useLocation();
    return !location.pathname.startsWith('/admin') ? (
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuth} />
    ) : null;
  };

  const Foot = () => {
    const location = useLocation();
    return !location.pathname.startsWith('/admin') ? (
      <Footer />
    ) : null;
  };

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={!isAuthenticated ? <SignIn setIsAuthenticated={setIsAuth} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isAuthenticated ? <SignUp setIsAuthenticated={setIsAuth} /> : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticated ? <UpProfile /> : <Navigate to="/signin" />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin/*" element={isAuthenticated && isAdmin() ? <AdminDashbord setIsAuthenticated={setIsAuth} /> : <Navigate to="/signin" />} />
          <Route path="/product/:productId" element={<OneProduct />} />
        </Routes>
        <Foot />
      </Router>
    </ThemeProvider>
  );
}

export default App;
