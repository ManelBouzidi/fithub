import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';

const drawerWidth = 240;

const SidebarAdmin = () => {
   return (
      <Drawer
         sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
               width: drawerWidth,
               boxSizing: 'border-box',
               backgroundColor: 'black',
               color: 'white',
            },
         }}
         variant="permanent"
         anchor="left"
      >
         <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
               Admin Dashboard
            </Typography>
         </Toolbar>
         <List>
            <ListItem button component={Link} to="/admin" sx={{ '&:hover': { backgroundColor: '#333' } }}>
               <ListItemIcon>
                  <HomeIcon sx={{ color: 'white' }} />
               </ListItemIcon>
               <ListItemText sx={{ color: 'white' }} primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/admin/products" sx={{ '&:hover': { backgroundColor: '#333' } }}>
               <ListItemIcon>
                  <ShoppingCartIcon sx={{ color: 'white' }} />
               </ListItemIcon>
               <ListItemText sx={{ color: 'white' }} primary="Products" />
            </ListItem>
            <ListItem button component={Link} to="/admin/categories" sx={{ '&:hover': { backgroundColor: '#333' } }}>
               <ListItemIcon>
                  <CategoryIcon sx={{ color: 'white' }} />
               </ListItemIcon>
               <ListItemText sx={{ color: 'white' }} primary="Categories" />
            </ListItem>
            <ListItem button component={Link} to="/admin/customers" sx={{ '&:hover': { backgroundColor: '#333' } }}>
               <ListItemIcon>
                  <PeopleIcon sx={{ color: 'white' }} />
               </ListItemIcon>
               <ListItemText sx={{ color: 'white' }} primary="Customers" />
            </ListItem>
            <ListItem button component={Link} to="/admin/orders" sx={{ '&:hover': { backgroundColor: '#333' } }}>
               <ListItemIcon>
                  <ReceiptIcon sx={{ color: 'white' }} />
               </ListItemIcon>
               <ListItemText sx={{ color: 'white' }} primary="Orders" />
            </ListItem>
         </List>
      </Drawer>
   );
};

export default SidebarAdmin;
