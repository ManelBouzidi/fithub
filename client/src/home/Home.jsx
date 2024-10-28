
import {Container, CssBaseline} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../components/Theme.jsx";
import Navbar from "../components/Navbar.jsx";
import Banner from "../components/banner.jsx";
import Promotions from "../components/Promotion.jsx";
import Products from "../components/Product.jsx";

function Home() {
  
  return <ThemeProvider theme={Theme}><Container 
  maxWidth="xl"
  sx={
    {background:"#fff"}
  }
  >
   <Navbar/>
   <Banner />
   <Promotions />
   <Products />

    <CssBaseline />
  </Container>
  </ThemeProvider>
}

export default Home;
