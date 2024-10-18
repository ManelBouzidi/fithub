import { useEffect } from "react";
import "./App.css";
import {Button, Container} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./components/Theme.jsx";
import Navbar from "./components/Navbar.jsx";
import Banner from "./components/banner.jsx";

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

    
  </Container>
  </ThemeProvider>
}

export default App;
