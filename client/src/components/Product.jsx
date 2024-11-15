import { useTheme } from "@mui/material/styles";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, Container, TextField, Chip, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function Products() {
    const theme = useTheme();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/product/getAll');
            setProducts(res.data);
        } catch (err) {
            setError('Error: nothing to show');
            console.error(err);
        }
    };

    const searchProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/product/search?term=${searchTerm}`);
            setProducts(res.data);
        } catch (err) {
            setError('Error: unable to search products');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            searchProducts();
        } else {
            fetchProducts();
        }
    }, [searchTerm]);

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        const categoryName = product.category ? product.category.name : 'No category';
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(product);
        return acc;
    }, {});

    return (
        <Container maxWidth="lg">
            <Typography mt={8} mb={4} textAlign='center' variant="h3" component="h1" gutterBottom style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                Our Products
            </Typography>
            <TextField
                fullWidth
                label="Search products"
                variant="outlined"
                value={searchTerm}
                sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                        color: '#ffffff',
                        '& fieldset': {
                            borderColor: '#ffffff'
                        },
                        '&:hover fieldset': {
                            borderColor: '#ffffff'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ffffff'
                        }
                    },
                    '& .MuiInputLabel-root': {
                        color: '#ffffff'
                    }
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '30px' }}
            />
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <Paper elevation={3} key={category} style={{ padding: '20px', marginBottom: '30px', backgroundColor: theme.palette.background.default }}>
                    <Typography variant="h4" component="h2" gutterBottom style={{ color: theme.palette.secondary.main, borderBottom: `2px solid ${theme.palette.secondary.main}`, paddingBottom: '10px', marginBottom: '20px' }}>
                        {category}
                    </Typography>
                    <Grid container spacing={4}>
                        {categoryProducts.map(product => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                <Card elevation={2} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.images}
                                        alt={product.name}
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <CardContent style={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" component="div" noWrap>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={{ height: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {product.description}
                                        </Typography>
                                        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="h6" color="text.primary">
                                                {product.price} DT
                                            </Typography>
                                            {product.category && (
                                                <Chip
                                                    label={product.category.name}
                                                    color="primary"
                                                    size="small"
                                                />
                                            )}
                                        </Box>
                                    </CardContent>
                                    <CardActions style={{ justifyContent: 'center', padding: '16px' }}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            component={Link}
                                            sx={{ background: '#a71415', color: 'white' }}
                                            to={`/product/${encodeURIComponent(product.id)}`}
                                            style={{ width: '100%' }}
                                        >
                                            View Details
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            ))}
        </Container>
    );
}
