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
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('http://localhost:3000/category/getAll')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };

    const handleCreate = () => {
        axios.post('http://localhost:3000/category/add', newCategory)
            .then(() => {
                setOpenCreate(false);
                fetchCategories();
                setNewCategory({ name: '' });
            })
            .catch((error) => {
                console.error('Error creating category:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCategory(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Categories List
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenCreate(true)}
                sx={{ mb: 2 }}
            >
                Create New Category
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow
                                key={category.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {category.id}
                                </TableCell>
                                <TableCell>{category.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
                <DialogTitle>Create New Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Category Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCategory.name}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={() => setOpenCreate(false)}>Cancel</Button>
                    <Button color='info' onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default CategoryList;
