import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import {
    Typography,
    Card,
    CardMedia,
    Button,
    Grid,
    Box,
    Divider,
    Snackbar,
    Alert
} from "@mui/material";
import { getAuthHeader } from "../auth";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function OneProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const fetchProductDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/product/getOne/${productId}`, { headers: getAuthHeader() });
            setProduct(res.data);
        } catch (err) {
            setError('Error: could not fetch product details');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.includes(productId)) {
            setOpenErrorSnackbar(true);
        } else {
            cart.push(productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            setOpenSuccessSnackbar(true);
            // Dispatch a custom event to notify Navbar of the cart update
            window.dispatchEvent(new Event('cartUpdated'));
        }
    };

    const handleCloseSuccessSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessSnackbar(false);
    };

    const handleCloseErrorSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorSnackbar(false);
    };

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="500"
                            image={product.images}
                            alt={product.name}
                            sx={{ objectFit: 'contain' }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Price: {product.price} DT
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCartIcon />}
                            onClick={addToCart}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" gutterBottom>
                        Product Details
                    </Typography>
                    <Typography variant="body2">
                        Category: {product?.category?.name || 'N/A'}
                    </Typography>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSuccessSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSuccessSnackbar}
            >
                <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%' }}>
                    Product added to cart successfully!
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openErrorSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseErrorSnackbar}
            >
                <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: '100%' }}>
                    Product is already in the cart!
                </Alert>
            </Snackbar>
        </Box>
    );
}
