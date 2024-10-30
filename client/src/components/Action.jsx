import React from 'react'
import { MyList } from '../styles/NavStyle'
import { Divider, ListItemButton, ListItemIcon } from '@mui/material'
import { Search, Person, ShoppingCart } from '@mui/icons-material'

function Action() {
  return (
    <MyList type="row">
      <ListItemButton sx={{ justifyContent: 'center' }}>
        <ListItemIcon
          sx={{ display: 'flex', justifyContent: 'center' }}>
          <ShoppingCart /></ListItemIcon>
      </ListItemButton>
      <Divider orientation='vertical' flexItem />
      <ListItemButton>
        <ListItemIcon>
          <Search />
        </ListItemIcon>
      </ListItemButton>
    </MyList>
  )
}

export default Action