import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./components/Theme.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./home/Home.jsx";
import { isAuthenticated } from "./auth.js";
import Cart from "../Shop/Cart.jsx";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    document.title = "Final Project--FitHub--";
    setIsAuth(isAuthenticated());
  }, []);

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ background: "#fff" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={isAuth ? <Cart /> : <Navigate to="/signin" />} /> {/* Cart Route */}
            <Route path="/signin" element={!isAuth ? <SignIn setIsAuthenticated={setIsAuth} /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuth ? <SignUp setIsAuthenticated={setIsAuth} /> : <Navigate to="/" />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
