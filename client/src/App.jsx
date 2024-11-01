import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./components/Theme.jsx";
import Navbar from "./components/Navbar.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./home/Home.jsx";
import { isAuthenticated } from "./auth.js";
import Cart from "../Shop/Cart.jsx";
import UpProfile from "./components/UpProfil.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact/Contact.jsx";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ isAuthenticated:", isAuthenticated())
    setIsAuth(isAuthenticated());
  }, []);

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ background: "#fff", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar isAuthenticated={isAuth} setIsAuthenticated={setIsAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={isAuth ? <Cart /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={!isAuth ? <SignIn setIsAuthenticated={setIsAuth} /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuth ? <SignUp setIsAuthenticated={setIsAuth} /> : <Navigate to="/" />} />
            <Route path="/profile" element={<UpProfile />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
