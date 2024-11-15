import { createTheme } from "@mui/material";

export const Colors = {
    primary: "#ffffff",
    secondary: "#aaaaaa",
    succes: "#28a745",
    info: "#17a2b8",
    danger: "#dc3545",
    warning: "#ffc107",
    dark: "#f8f9fa",
    light: "#343a40",
    muted: "#6c757d",
    border: "#dee2e6",
    inverse: "#292b2c",
    shaft: "#333333",
    dove_gray: "#fff",
    body_bg: "#000000",

    white: "#000000",
    black: "#ffffff",
};

const Theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        },
        secondary: {
            main: Colors.secondary
        },
        background: {
            default: Colors.body_bg
        }
    },
});
export default Theme;
