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
    DialogContentText,
    DialogTitle,
    TextField,
    Avatar,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        description: '',
        price: '',
        images: '',
        categoryId: ''
    });
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        images: '',
        categoryId: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:3000/product/getAll')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    };

    const fetchCategories = () => {
        axios.get('http://localhost:3000/category/getAll')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setOpenDelete(true);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setEditedProduct({
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            categoryId: product.categoryId
        });
        setPreviewUrl(product.images);
        setOpenEdit(true);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/product/delete/${selectedProduct.id}`)
            .then(() => {
                setOpenDelete(false);
                fetchProducts();
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
            });
    };

    const handleEdit = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = async () => {
                editedProduct.images = reader.result;
                sendEditRequest();
            };
        } else {
            sendEditRequest();
        }
    };

    const sendEditRequest = () => {
        axios.put(`http://localhost:3000/product/update/${selectedProduct.id}`, editedProduct)
            .then(() => {
                setOpenEdit(false);
                fetchProducts();
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    const handleCreate = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = async () => {
                newProduct.images = reader.result;
                sendCreateRequest();
            };
        } else {
            sendCreateRequest();
        }
    };

    const sendCreateRequest = () => {
        axios.post('http://localhost:3000/product/add', newProduct)
            .then(() => {
                setOpenCreate(false);
                fetchProducts();
                setNewProduct({ name: '', description: '', price: '', images: '', categoryId: '' });
                setSelectedFile(null);
                setPreviewUrl(null);
            })
            .catch((error) => {
                console.error('Error creating product:', error);
            });
    };

    const handleInputChange = (event, isNewProduct = false) => {
        const { name, value } = event.target;
        if (isNewProduct) {
            setNewProduct(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setEditedProduct(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFileChange = (event, isNewProduct = false) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                if (isNewProduct) {
                    setNewProduct(prev => ({ ...prev, images: reader.result }));
                } else {
                    setEditedProduct(prev => ({ ...prev, images: reader.result }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Products List
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenCreate(true)}
                sx={{ mb: 2 }}
            >
                Create New Product
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Avatar src={product.images || 'https://via.placeholder.com/40'} />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell>{product.category ? product.category.name : 'N/A'}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleEditClick(product)}>Edit</Button>
                                    <Button onClick={() => handleDeleteClick(product)} color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Avatar
                                src={previewUrl || editedProduct.images || 'https://via.placeholder.com/100'}
                                sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editedProduct.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editedProduct.description}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="price"
                                label="Price"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={editedProduct.price}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    value={editedProduct.categoryId}
                                    onChange={handleInputChange}
                                    name="categoryId"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="normal"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                label="Product Image"
                                inputProps={{ accept: "image/*" }}
                                onChange={(e) => handleFileChange(e, false)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button onClick={handleEdit}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Avatar
                                src={previewUrl || 'https://via.placeholder.com/100'}
                                sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={newProduct.name}
                                onChange={(e) => handleInputChange(e, true)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={newProduct.description}
                                onChange={(e) => handleInputChange(e, true)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="price"
                                label="Price"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={newProduct.price}
                                onChange={(e) => handleInputChange(e, true)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    value={newProduct.categoryId}
                                    onChange={(e) => handleInputChange(e, true)}
                                    name="categoryId"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="normal"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                label="Product Image"
                                inputProps={{ accept: "image/*" }}
                                onChange={(e) => handleFileChange(e, true)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ProductsList;
