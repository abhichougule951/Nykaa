import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        id: '',
        name: '',
        brand: '',
        description: '',
        price: 0,
        category_id: 1,
        imageUrl: '',
    });

  

   

    const createProduct = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/products', newProduct);
            setProducts([...products, response.data]);
            setNewProduct({
                name: '',
                brand: '',
                description: '',
                price: 0,
                category_id: 1,
                imageUrl: '',
            });
            alert('Product added successfully');
        } catch (error) {
            console.error('Error creating product:', error.response ? error.response.data : error.message);
        }
    };

    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${newProduct.id}`);
           
            alert('Product deleted successfully');
            setNewProduct({ ...newProduct, id: '' });
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <>
        <h6 style={{
            backgroundColor:'#F72BE2',
            backgroundSize: 'cover',
            fontFamily: 'Running Text, sans-serif',
            color: '#333'
        }} >Admin Dashboard For Adding and Deleting Products</h6>
        <h7 style={{color:'#C543B8'}}>Nykaa</h7>
        <div style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',
            height: '160vh',
          
            
        }}>
            <div className="container mt-4" style={{ maxWidth: '300px' }}>
                <div className="card p-2" style={{ height: 'auto' }}>
                    <h3 className="fst-italic" style={{ color: '#F72BE2', fontSize: '0.8rem', marginBottom: '8px' }}>Create New Product</h3>
                    <form>
                        <div className="mb-1">
                            <label className="fst-italic" style={{ color: '#F72BE2', fontSize: '0.8rem', marginBottom: '8px' }}>Name:</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-1">
                            <label className="fst-italic" style={{ color: '#F72BE2', fontSize: '0.8rem', marginBottom: '8px' }}>Brand:</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={newProduct.brand}
                                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                            />
                        </div>
                        <div className="mb-1">
                            <label className="fst-italic" style={{ color: '#F72BE2', fontSize: '0.8rem', marginBottom: '8px' }}>Description:</label>
                            <textarea
                                className="form-control form-control-sm"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            />
                        </div>
                        <div className="mb-1">
                            <label className="fst-italic" style={{ color: '#F72BE2', fontSize: '0.8rem', marginBottom: '8px' }}>Price:</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                        </div>
                        <div className="mb-1">
                            <label className="fst-italic" style={{ color: '#F72BE2', fontSize: '0.8rem', marginBottom: '8px' }}>Category ID:</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                value={newProduct.category_id}
                                onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                            />
                        </div>
                        <div className="mb-1">
                            <label className="fst-italic" style={{ color: '#F72BE2', fontSize: '0.8rem', marginBottom: '8px' }}>Image URL:</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={newProduct.imageUrl}
                                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                            />
                        </div>
                        <button type="button" className="btn btn-primary btn-sm mt-1" style={{backgroundColor : '#F72BE2' }}onClick={createProduct}>
                            Create Product
                        </button>
                    </form>
                    <hr className="my-2" />
                    <h3 className="fst-italic" style={{ color: '#F72BE2', fontSize: '0.8rem', marginBottom: '8px' }}>Delete Product by Product_Id</h3>
                    <form>
                        <div className="mb-1">
                            <label className="fst-italic" style={{ color: '#F72BE2', fontSize: '0.8rem', marginBottom: '8px' }}>Product Id:</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                value={newProduct.id}
                                onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                            />
                        </div>
                        <button type="button" className="btn btn-danger btn-sm mt-1" onClick={deleteProduct}>
                            Delete Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default ProductDashboard;
