import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { getAuthHeader } from '../../auth';

function HomeAdmin() {
  const [productsCount, setProductsCount] = useState(null);
  const [categoriesCount, setCategoriesCount] = useState(null);
  const [customersCount, setCustomersCount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/product/getAll')
      .then((response) => setProductsCount(response.data.length))

    axios.get('http://localhost:3000/category/getAll')
      .then((response) => setCategoriesCount(response.data.length))

    axios.get('http://localhost:3000/user/getAll', {
      headers: getAuthHeader()
    })
      .then((response) => setCustomersCount(response.data.length))
  }, []);

  const cardData = [
    { title: 'PRODUCTS', count: productsCount, icon: <BsFillArchiveFill />, color: '#ff9800' },
    { title: 'CATEGORIES', count: categoriesCount, icon: <BsFillGrid3X3GapFill />, color: '#4caf50' },
    { title: 'CUSTOMERS', count: customersCount, icon: <BsPeopleFill />, color: '#2196f3' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        DASHBOARD
      </Typography>
      <Grid container spacing={3} sx={{ flexWrap: 'nowrap' }}>
        {cardData.map((card, index) => (
          <Grid item xs={4} key={index}>
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
