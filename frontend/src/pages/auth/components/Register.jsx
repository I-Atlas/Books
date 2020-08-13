import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class Register extends Component {
    render() {
        return (
            <Form>
                <h3>Sign Up</h3>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
            </Form.Group>
                <Button variant="primary" type="submit" block>
                    Sign Up
                </Button>
                <Form.Text className="forgot-password">
                    Already registered <a href="/login">sign in?</a>
                </Form.Text>
            </Form>
        )
    }
}

export default Register