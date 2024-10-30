import { useTheme } from "@mui/material/styles";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";

export default function Products() {
    const theme = useTheme();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/product/getAll');
            setProducts(res.data);
        } catch (err) {
            setError('Error: nothing to show');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div>
            <Typography mt={8} mb={4} textAlign='center' variant="h4" component="h1" gutterBottom style={{ color: theme.palette.primary.main }}>
                All our products
            </Typography>
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.images}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" color="text.primary" mt={2}>
                                    {product.price} DT
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" size="small">Buy</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
