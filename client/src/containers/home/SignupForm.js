
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Container, Form, Button, Jumbotron } from 'react-bootstrap'
import API from "../../utils/API";


function SignupForm() {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [payload, setPayload] = useState({});

    const handleChange = async (event) => {
        const type = event.target.name;

        // payload looks like: {
        //     email: '',
        //     password: '',
        // }
        setPayload({
            ...payload,
            [type]: event.target.value, // dynamically set the type of payload
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        // call api to login
        try {
            const response = await API.registerPost(payload)
            history.push("/portfolio");
        } catch (err) {
            // not authenticated
            console.log(err.response);
            if (err.response.data.errors) {
                const errorMsg = err.response.data.errors.map(
                    (err) => err.msg
                );
                // failed to register
                setErrors([...errorMsg]);
            } else {
                setErrors(['Whoops please enter your credentials']);
            }
        };
    };

    return (
        <>
            <Container>
                <Row>
                    <Col xs={3}></Col>
                    <Col xs={6}>
                        <Jumbotron>
                            <Form onSubmit={onSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        onChange={handleChange}
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                 </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password Again</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password_again"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Row md={4}>
                                    <Col xs={3}>
                                        <Button onClick={onSubmit} variant="secondary" type="submit">
                                            Submit
                                        </Button>
                                    </Col>
                                    <Col xs={6}></Col>
                                    <Col xs={3}>
                                    </Col>
                                </Row>
                                <Row>
                                    {errors.map((error) => (
                                        <p key={error} variant="danger">
                                            {error}
                                        </p>
                                    ))}
                                </Row>

                            </Form>
                        </Jumbotron>
                    </Col>
                    <Col xs={3}></Col>
                </Row>
            </Container>
        </>
    );
}

export default SignupForm;
