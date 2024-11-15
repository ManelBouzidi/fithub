import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { List, Typography } from "@mui/material";
import { Colors } from "../components/Theme.jsx";
import "@fontsource/roboto";


//container
export const NavbarContainer = styled(Box)(() => ({
    display: 'flex',
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 8px'
}));


//header
export const NavbarHeader = styled(Typography)(() => ({
    padding: '4px',
    flexGrow: 1,
    fontSize: '4em',
    fontFamily: "'Roboto', 'Arial', 'sans-serif'",
    color: Colors.secondary,
    width: '20px',
}))

export const MyList = styled(List)(({ type }) => ({
    color: 'white',
    display: type === 'row' ? 'flex' : 'block',
    flexGrow: 3,
    justifyContent: 'center',
    alignItems: 'center'
}))