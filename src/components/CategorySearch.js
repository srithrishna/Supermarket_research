// src/CategorySearch.js
import React, { useState } from 'react';
import axios from 'axios';

const CategorySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      const filteredProducts = response.data.filter(product =>
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
    } catch (err) {
      setError('Failed to fetch products.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Search for Products</h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter category..."
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Search</button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.productsContainer}>
        {products.map(product => (
          <div key={product.id} style={styles.productCard}>
            <img src={product.path} alt={product.name} style={styles.image} />
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.productCategory}>{product.category}</p>
            <p style={styles.productPrice}>${product.price}</p>
            <p style={styles.productquantity}>Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  productsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    margin: '10px',
    padding: '15px',
    textAlign: 'center',
    width: '200px',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  productCategory: {
    color: '#666',
  },
  productPrice: {
    color: '#007bff',
    fontSize: '16px',
  },
};

export default CategorySearch;
