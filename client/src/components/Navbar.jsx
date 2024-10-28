import { ListItemButton, ListItemIcon, ListItemText, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Search } from "@mui/icons-material";
import { MyList, NavbarContainer, NavbarHeader } from "../styles/NavStyle";
import Action from "./Action";
import { useNavigate } from "react-router-dom";
import { signOut } from "../auth";

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <NavbarContainer>
      <NavbarHeader>FitHub</NavbarHeader>
      <MyList type="row">
        <ListItemText primary="Home" onClick={() => navigate("/")} />
        <ListItemText primary="Category" />
        <ListItemText primary="Products" />
        <ListItemText primary="Contact Us" />
        <ListItemButton>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
        </ListItemButton>
      </MyList>
      {isAuthenticated ? (
        <Button color="inherit" onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button color="inherit" onClick={() => navigate("/signin")}>
          Sign In
        </Button>
      )}
      <Action />
    </NavbarContainer>
  );
}
