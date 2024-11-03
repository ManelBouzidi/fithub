import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    CircularProgress,
    Card,
    CardContent,
    Grid,
    Avatar
} from '@mui/material';
import { getAuthHeader } from "../auth";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            try {
                const itemPromises = cart.map(productId =>
                    axios.get(`http://localhost:3000/product/getOne/${productId}`, { headers: getAuthHeader() })
                );
                const responses = await Promise.all(itemPromises);
                setCartItems(responses.map(res => res.data));
                setLoading(false);
            } catch (err) {
                console.error('Error fetching cart items:', err);
                setError('Failed to load cart items. Please try again.');
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ maxWidth: 1000, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {cartItems.map((item) => (
                            <Grid item xs={12} key={item._id}>
                                <Card>
                                    <CardContent>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item>
                                                <Avatar
                                                    src={item.images}
                                                    alt={item.name}
                                                    sx={{ width: 80, height: 80 }}
                                                    variant="rounded"
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography variant="h6">{item.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">{item.price} DT</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Card sx={{ mt: 4, bgcolor: 'primary.light' }}>
                        <CardContent>
                            <Typography variant="h5" align="right" color="primary.contrastText">
                                Total: {calculateTotal()} DT
                            </Typography>
                        </CardContent>
                    </Card>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="primary" size="large">
                            Checkout
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}
