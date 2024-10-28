import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./components/Theme.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./home/Home.jsx"; // Import Home component
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
            <Route path="/" element={<Home />} /> {/* Home page accessible to everyone */}
            <Route path="/signin" element={!isAuth ? <SignIn setIsAuthenticated={setIsAuth} /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuth ? <SignUp setIsAuthenticated={setIsAuth} /> : <Navigate to="/" />} />
          </Routes>
          <CssBaseline />
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
