import React from 'react'
import { useTheme } from "@mui/material/styles";
import { BannerContainer,BannerContent, BannerDescription, BannerImage, BannerTitle } from '../styles/BannerStyle';
import { Typography,useMediaQuery } from '@mui/material';
function Banner() {

    const theme =useTheme();
    const matches =useMediaQuery(theme.breakpoints.down("md"));
  return (
    <BannerContainer>
    <BannerImage src='./BannerImage/banner.jpg'/>
      <BannerContent>
        <Typography variant='h6'>Our Equipment</Typography>
        <BannerTitle variant='h3'>
        New Collection
        </BannerTitle>
        <BannerDescription variant='subtitle' >
         We provide all kind of equipment to any sport.
        </BannerDescription>
      </BannerContent>
    </BannerContainer>
  
  )
}

export default Banner;