import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./components/Theme.jsx";
import Navbar from "./components/Navbar.jsx";
import Banner from "./components/banner.jsx";
import Promotions from "./components/Promotion.jsx";
import Products from "./components/Product.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import { isAuthenticated } from "./auth.js";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    document.title = "Final Project--FitHub--";
    setIsAuth(isAuthenticated());
  }, []);

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <Container maxWidth="xl" sx={{ background: "#fff" }}>
          <Routes>
            <Route path="/signin" element={!isAuth ? <SignIn setIsAuthenticated={setIsAuth} /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuth ? <SignUp setIsAuthenticated={setIsAuth} /> : <Navigate to="/" />} />
            <Route
              path="/"
              element={
                isAuth ? (
                  <>
                    <Navbar isAuthenticated={isAuth} setIsAuthenticated={setIsAuth} />
                    <Banner />
                    <Promotions />
                    <Products />
                  </>
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
          </Routes>
          <CssBaseline />
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
