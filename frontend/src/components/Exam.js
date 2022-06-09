import React, { useRef } from 'react'
import { Container, Row, Card, Col, Form, Button, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import axios from 'axios'
import '../index.css'
import JoditEditor from "jodit-react";

const Exam = () => {
    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [departmentname, setDepartment] = useState('')
    const [departmentid, setDepartmentId] = useState('')
    const [dep, setDep] = useState([])
    const [dayOff, setDeyOff] = useState('')
    const [result, setResult] = useState([])

    const editor = useRef(null)
    const [content, setContent] = useState('')


    useEffect(() => {
        async function dep() {
            let { data } = await axios.get('http://localhost:8000/department')
            setDep(data)
        }
        dep()
    }, [])

    let handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/exam", {
            name: name,
            time: time,
            departmentname: departmentname,
            departmentid: departmentid,
            dayOff: dayOff,
            content: content
        })
        console.log("Gese");
    }



    let handleDepChange = (e) => {
        setDepartment(JSON.parse(e.target.value).name)
        setDepartmentId(JSON.parse(e.target.value)._id);
    }

    // useEff ect(() => {
    //     async function product() {
    //         const { data } = await axios.get("http://localhost:8000/product")
    //         setProduct(data);
    //     }
    //     product()
    // }, [])
    useEffect(() => {
        async function result() {
            const { data } = await axios.get("http://localhost:8000/exam")
            setResult(data)

        }
        result()
    }, [])

    return (
        <Container className='mt-5'>
            <div className='exam'>
                <Form >
                    <Row className="mb-3">
                        <Col xs={6}>
                            <Form.Control placeholder="name" className='custom' onChange={(e) => setName(e.target.value)} />
                        </Col>
                        <Col xs={6}>
                            <Form.Control placeholder="Office time" className='custom' onChange={(e) => setTime(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={6}>
                            {/* <Form.Control placeholder="Office time" className='custom' onChange={(e) => setDepartment(e.target.value)} /> */}

                            <select className='form-control custom' onChange={handleDepChange}>
                                <option>-Select Department Name-</option>
                                {dep.map(item => (
                                    <option value={JSON.stringify(item)}> {item.name}</option>
                                ))}

                            </select>
                        </Col>
                        <Col xs={6}>
                            <Form.Control placeholder="Day Off" className='custom' onChange={(e) => setDeyOff(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => { }}
                            />
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <Button className='btn-custom' type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className='mt-5'>
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Office Time</th>
                            <th>Off Day</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map(item => (
                            <tr className='table-custom text-center'>
                                <td>{item.name}</td>
                                <td>{item.departmentname}</td>
                                <td>{item.time}</td>
                                <td>{item.dayOff}</td>
                                <td dangerouslySetInnerHTML={{ __html: item.content }}></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {/* <Form>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Form> */}

        </Container >
    )
}

export default Exam