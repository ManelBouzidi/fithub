import { styled } from "@mui/system"
import { Colors } from "../components/Theme"
import { Button, IconButton } from "@mui/material";


export const ProductOne =styled(Box)(({theme})=>({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    [theme.breakpoints.up('md')]:{position:'relative'}
}));

export const ProductImage=styled('img')(({src,theme}) =>({
    src:`url(${src})`,
    width:'100%',
    background:Colors.dove_gray,
    padding:'10px',
    [theme.breakpoints.up('md')]:{
        width:'80%',
        padding:'24px'
    }
}));
export const ProductActionBtn=styled(IconButton)(()=>({
    background:Colors.white,
    margin:4,
}));

export const ProductFavBtn=styled(ProductActionBtn)(({isfav,theme})=>({
    color:isfav?Colors.primary:Colors.light,
    [theme.breakpoints.up('md')]:{
        position:'absolute',
        right:0,
        top:0,
    }
}));


export const ProductAddToCart=styled(Button)((show,theme)=>({
width:'120px',
fontSize:'12px',
[theme.breakpoints.up('md')]:{
    position:'absolute',
    bottom:'2%',
    width:'300px',
    padding:'10px,5px'
},
background:Colors.secondary,
opacity:0.9,
}))