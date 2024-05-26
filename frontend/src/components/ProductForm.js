import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { createProduct, updateProduct, getProductById } from '../services/productService';
import { getCurrentUser } from '../services/authService';

const ProductForm = () => {
    const [product, setProduct] = useState({ productName: '', price: 0, quantity: 0 }); 
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const loadProduct = async () => {
            if (id) {
                const result = await getProductById(id);
                setProduct(result.data);
            }
        };

        loadProduct();
    }, [id]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateProduct(id, product);
        } else {
            await createProduct(product);
        }
        navigate('/products');
    };

    return (
        <Container className="mt-5">
            <h2>{id ? 'Update Product' : 'Add Product'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={product.productName}
                        onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        value={product.quantity}
                        onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value) })}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {id ? 'Update' : 'Add'}
                </Button>
            </Form>
        </Container>
    );
};

export default ProductForm;
