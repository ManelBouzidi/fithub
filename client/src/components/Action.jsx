import React from 'react'
import { MyList } from '../styles/NavStyle'
import { Divider, ListItemButton, ListItemIcon } from '@mui/material'
import {  Favorite, Person, ShoppingCart } from '@mui/icons-material'

function Action() {
  return (
    <MyList type="row">
        <ListItemButton sx={{justifyContent:'center'}}>
          <ListItemIcon 
          sx={{display:'flex',justifyContent:'center'}}>
          <ShoppingCart/></ListItemIcon>
        </ListItemButton>
        <Divider orientation='vertical' flexItem/>
        <ListItemButton sx={{justifyContent:'center'}}>
          <ListItemIcon sx={{display:'flex',justifyContent:'center'}}><Favorite /></ListItemIcon>
        </ListItemButton>
        <Divider orientation='vertical' flexItem/>
        <ListItemButton sx={{justifyContent:'center'}}>
          <ListItemIcon sx={{display:'flex',justifyContent:'center'}}><Person/></ListItemIcon>
        </ListItemButton>
    </MyList>
  )
}

export default Action