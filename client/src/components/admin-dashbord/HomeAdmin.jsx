import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import './App.css';

function HomeAdmin() {
  const [productsCount, setProductsCount] = useState(null);
  const [categoriesCount, setCategoriesCount] = useState(null);
  const [customersCount, setCustomersCount] = useState(null);

  useEffect(() => {
    // Fetch Products Count
    fetch('http://localhost:3000/product/getAll')
      .then((res) => res.json())
      .then((data) => setProductsCount(data.count))  // Assuming data has a 'count' field
      .catch((error) => console.error('Error fetching products count:', error));

    // Fetch Categories Count
    fetch('http://localhost:3000/category/getAll')
      .then((res) => res.json())
      .then((data) => setCategoriesCount(data.count))
      .catch((error) => console.error('Error fetching categories count:', error));

    // Fetch Customers Count
    fetch('http://localhost:3000/user/getAll')
      .then((res) => res.json())
      .then((data) => setCustomersCount(data.count))
      .catch((error) => console.error('Error fetching customers count:', error));
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>
      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className='card_icon'/>
          </div>
          <h1>{productsCount !== null ? productsCount : 'Loading...'}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon'/>
          </div>
          <h1>{categoriesCount !== null ? categoriesCount : 'Loading...'}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card_icon'/>
          </div>
          <h1>{customersCount !== null ? customersCount : 'Loading...'}</h1>
        </div>
      </div>
    </main>
  );
}

export default HomeAdmin;
