import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import { getAuthHeader } from '../../auth';

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get('http://localhost:3000/user/getAll', {
            headers: getAuthHeader(),
        })
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching customers:', error);
            });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Customers List
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow
                                key={customer.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {customer.id}
                                </TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.lastName}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default CustomerList;
