import React from 'react';
import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';
import HomeAdmin from './HomeAdmin';
import ProductsList from './ProductsList';
import SidebarAdmin from './SidebarAdmin';
import { isAuthenticated, isAdmin } from '../../auth';
import CategoryList from './CategoryList';
import CustomerList from './CustomerList';

const drawerWidth = 240;

function AdminDashboard({ setIsAuthenticated }) {
  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to="/signin" />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarAdmin />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <HeaderAdmin setIsAuthenticated={setIsAuthenticated} />
        <Box sx={{ mt: 8 }}> {/* Add top margin to account for the fixed AppBar */}
          <Routes>
            <Route index element={<HomeAdmin />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="customers" element={<CustomerList />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboard;
