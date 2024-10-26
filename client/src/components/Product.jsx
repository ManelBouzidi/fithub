import {useTheme} from "@mui/material/styles";
import axios from 'axios';
import { useEffect, useState } from "react";


export default function Products(){
const theme=useTheme();
const [products,setProducts]=useState([]);
const [error,setError]=useState(null);
    
const Products=async()=>{
    try{
        const res=await axios.get('http://localhost:3000/product/getAll');
        setProducts(res.data);
    }catch (err){
        setError('Error nothing to show');
        console.error(err);
        
    }
};
useEffect(()=>{Products()},[]);

if (error){return <div>Error:{error}</div>}

return (
<div>
<h1 style={{color:theme.palette.primary.main}}>Products</h1>
<ul>
{products.map(products=>(
    <li key={products.id}>
        <h3>{products.name}</h3>
        <p>{products.description}</p>
        <p>Price:${products.price}</p>
        <img src={products.images} alt={products.name} style={{width:'100px',height:'100px'}}/>
    </li>
))}
</ul>
</div>
)
}