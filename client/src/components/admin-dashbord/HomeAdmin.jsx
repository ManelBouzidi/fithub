import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsCartFill } from 'react-icons/bs';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { getAuthHeader } from '../../auth';
import fithubLogo from '/BannerImage/fithublogo.png';

function HomeAdmin() {
  const [productsCount, setProductsCount] = useState(null);
  const [categoriesCount, setCategoriesCount] = useState(null);
  const [customersCount, setCustomersCount] = useState(null);
  const [ordersCount, setOrdersCount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/product/getAll')
      .then((response) => setProductsCount(response.data.length))

    axios.get('http://localhost:3000/category/getAll')
      .then((response) => setCategoriesCount(response.data.length))

    axios.get('http://localhost:3000/user/getAll', {
      headers: getAuthHeader()
    })
      .then((response) => setCustomersCount(response.data.length))

    axios.get('http://localhost:3000/order/getAll', {
      headers: getAuthHeader()
    })
      .then((response) => setOrdersCount(response.data.length))
  }, []);

  const cardData = [
    { title: 'PRODUCTS', count: productsCount, icon: <BsFillArchiveFill />, color: '#ff9800' },
    { title: 'CATEGORIES', count: categoriesCount, icon: <BsFillGrid3X3GapFill />, color: '#4caf50' },
    { title: 'CUSTOMERS', count: customersCount, icon: <BsPeopleFill />, color: '#2196f3' },
    { title: 'ORDERS', count: ordersCount, icon: <BsCartFill />, color: '#e91e63' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src={fithubLogo} alt="FitHub Logo" style={{ width: '400px', margin: 'auto' }} />
      </Box>
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{
              height: '100%',
              backgroundColor: card.color,
              color: 'white',
              '&:hover': {
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
              },
            }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" component="div">
                    {card.title}
                  </Typography>
                  {React.cloneElement(card.icon, { style: { fontSize: '2rem' } })}
                </Box>
                <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                  {card.count !== null ? card.count : '0'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomeAdmin;
