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
    CircularProgress
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
        <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="right">{item.price} DT</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <strong>Total</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                        <strong>{calculateTotal()} DT</strong>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="primary">
                            Checkout
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}
