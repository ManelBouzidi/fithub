import { Box, styled, Typography } from "@mui/material";



export const PromotionsContainer =styled(Box)(({theme})=>({

    [theme.breakpoints.up('md')]:{padding:'40px,0px,40px,0px'},
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:'20px 0px 20px 0px',
    overflow:'hidden',
    background:theme.palette.secondary.main
}))

export const MessageText =styled(Typography)(({theme})=>({
    fontFamily:'"Montez","cursive"',
    [theme.breakpoints.up('md')]:{fontSize:'3rem',},
    color:theme.palette.primary.main,
    fontSize:'1.5rem'
}))