import { createTheme } from "@mui/material";

export const Colors={
    primary:"#1976d2",
    secondary:"#aaaaaa",
    succes:"#28a745",
    info:"#17a2b8",
    danger:"#dc3545",
    warning:"#ffc107",
    dark:"#343a40",
    light:"#f8f9fa",
    muted:"#6c757d",
    border:"#dee2e6",
    inverse:"#292b2c",
    shaft:"#333333",
    dove_gray:"#d5d5d5",
    body_bg:"#f4f4f4",

    white:"#fff",
    black:"#000",
};

const Theme = createTheme({
    palette:{
        primary:{
            main:Colors.primary
        },
        secondary:{
            main:Colors.secondary
        }
    },

    componenets:{
        MuiButton:{
            defaultProps:{
                disableRipple:true,
                disableElevation:true,
            }
        }
    }
});
export default Theme;