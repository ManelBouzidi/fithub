import { useEffect } from "react";
import "./App.css";
import {Button, Container, CssBaseline} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./components/Theme.jsx";
import Navbar from "./components/Navbar.jsx";
import Banner from "./components/banner.jsx";
import Promotions from "./components/Promotion.jsx";

function App() {
  useEffect(()=>{
    document.title="Final Project--FitHub--"
  },[]);
  return <ThemeProvider theme={Theme}><Container 
  maxWidth="xl"
  sx={
    {background:"#fff"}
  }
  >
   <Navbar/>
   <Banner />
   <Promotions />

    <CssBaseline />
  </Container>
  </ThemeProvider>
}

export default App;
