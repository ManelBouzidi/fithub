
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../components/Theme.jsx";
import Banner from "../components/banner.jsx";
import Promotions from "../components/Promotion.jsx";
import Products from "../components/Product.jsx";

function Home() {

  return <>
    <Banner />
    <Promotions />
    <Products />

    <CssBaseline />
  </>
}

export default Home;
