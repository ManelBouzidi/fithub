import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress
} from '@mui/material';
import { getAuthHeader } from "../../auth";

export default function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/order/getAll', { headers: getAuthHeader() });
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to load orders. Please try again.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h4" gutterBottom component="div" sx={{ p: 2 }}>
                Orders
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Products</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.userId}</TableCell>
                                <TableCell>{order.price} DT</TableCell>
                                <TableCell>{order.products.join(', ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
