import React from 'react'
import { Container, Row, Card, Col, Form, Button, Table, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import axios from 'axios'

const Product = () => {
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [price, setPrice] = useState("")
    const [product, setProduct] = useState([])
    const [show, setShow] = useState(false);
    const [siPro, setSiPro] = useState({})

    const handleClose = () => setShow(false);

    let handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/", {
            name: name,
            brand: brand,
            price: price
        })
        console.log("Gese");
    }

    useEffect(() => {
        async function product() {
            const { data } = await axios.get("http://localhost:8000/product")
            setProduct(data);
        }
        product()
    }, [])

    let handleDelete = (id) => {
        axios.delete(`http://localhost:8000/product/${id}`)
    }

    const handleShow = async (id) => {
        console.log(id);
        let { data } = await axios.get(`http://localhost:8000/product/${id}`)
        console.log(data);
        setName(data.name)
        setBrand(data.brand)
        setPrice(data.price)
        setSiPro(data)
        setShow(true)
    };

    let handleEditSubmit = (id) => {
        axios.put(`http://localhost:8000/product/${id}`, {
            name: name,
            brand: brand,
            price: price
        })
        setShow(false)
    }
    return (
        <Container>
            <Row className='mt-5'>
                <Col>
                    <Card >
                        <Card.Title><h4 className='text-center mt-3'>Add Product</h4></Card.Title>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control type="taxt" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="Number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Title><h4 className='text-center mt-3'>Manage Product</h4></Card.Title>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map(item => (
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <Button variant="info" onClick={() => handleShow(item._id)}>Edit</Button>
                                                <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="taxt" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} value={brand} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="Number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} value={price} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => handleEditSubmit(siPro._id)}>
                        Submit
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Product