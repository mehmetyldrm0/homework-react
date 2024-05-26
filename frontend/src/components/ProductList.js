import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/productService';
import { getCurrentUser } from '../services/authService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await getProducts();
        setProducts(result.data);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        loadProducts();
    };

    return (
        <Container>
            <Row className="my-3">
                <Col>
                    <h2>Product List</h2>
                    <Link to="/add" className="btn btn-primary mb-3">Add Product</Link>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <Link to={`/edit/${product.id}`} className="btn btn-warning mr-3">Edit</Link>
                                        <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;
