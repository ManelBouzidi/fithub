import { ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import { useTheme } from "@mui/material/styles"
import theme from "./Theme";
import {Search} from "@mui/icons-material"
import {MyList, NavbarContainer,NavbarHeader} from "../styles/NavStyle"
import Action from "./Action";




export default function Navbar(){

  const Theme =useTheme();
  //const matches=useMediaQuery(Theme.breakpoints.down('md'));
    return (
        
<NavbarContainer>

  <NavbarHeader>FitHub</NavbarHeader>
  <MyList type="row">
    <ListItemText primary="Home"/>
    <ListItemText primary="Category"/>
    <ListItemText primary="Products"/>
    <ListItemText primary="Contact Us"/>
    <ListItemButton>
      <ListItemIcon>
        <Search />
      </ListItemIcon>
    </ListItemButton>
  </MyList>
  <Action />
</NavbarContainer>
    )

    
}