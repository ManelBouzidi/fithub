import React from 'react';
import { Link } from 'react-router-dom';
import {
   Drawer,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Typography,
   Box
} from '@mui/material';
import {
   Dashboard as DashboardIcon,
   Inventory as InventoryIcon,
   Category as CategoryIcon,
   People as PeopleIcon,
   ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

function SidebarAdmin() {
   const menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
      { text: 'Products', icon: <ShoppingCartIcon />, path: '/admin/products' },
      { text: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
      { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
   ];

   return (
      <Drawer
         variant="permanent"
         sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
               width: drawerWidth,
               boxSizing: 'border-box',
               bgcolor: 'primary.main',
               color: 'primary.contrastText',
            },
         }}
      >
         <Box sx={{ p: 2 }}>
            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               FitHub Admin
            </Typography>
         </Box>
         <List>
            {menuItems.map((item, index) => (
               <ListItem
                  button
                  component={Link}
                  to={item.path}
                  key={index}
                  sx={{
                     '&:hover': {
                        bgcolor: 'rgba(128, 128, 128, 0.2)',
                     }
                  }}
               >
                  <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                  <ListItemText sx={{ color: 'white' }} primary={item.text} />
               </ListItem>
            ))}
         </List>
      </Drawer>
   );
}

export default SidebarAdmin;
