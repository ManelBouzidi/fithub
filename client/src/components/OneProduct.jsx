// components/ProductDetail.jsx
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Typography, Card, CardMedia, CardContent, Button } from "@mui/material";

export default function OneProductl() {
    const { productName } = useParams(); // Get product name from the URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    const fetchProductDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/product/${encodeURIComponent(productName)}`);
            setProduct(res.data);
        } catch (err) {
            setError('Error: could not fetch product details');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [productName]);

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!product) {
        return <Typography>Loading...</Typography>; // Show a loading message while fetching data
    }

    return (
        <Card>
            <CardMedia
                component="img"
                height="400"
                image={product.images}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary" mt={2}>
                    Price: {product.price} DT
                </Typography>
                <Button variant="contained" size="small" onClick={() => { /* Add buy logic here */ }}>
                    Buy Now
                </Button>
            </CardContent>
        </Card>
    );
}
