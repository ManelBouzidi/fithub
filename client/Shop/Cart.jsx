import { useState, useEffect } from "react";
import Navbar from "../src/components/Navbar";
export default function Cart({ cartItems, onRemoveItem }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalPrice);
  }, [cartItems]);

  return (
    <div>
    <Navbar/>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => onRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${total.toFixed(2)}</h2>
      <button disabled={!cartItems.length}>Proceed to Checkout</button>
    </div>
  );
}
