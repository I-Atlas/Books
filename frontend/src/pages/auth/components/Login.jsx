import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class Login extends Component {
    render() {
        return (
            <Form>
                <h3>Sign In</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username or email address</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                    <Form.Text className="forgot-password text-left">
                        <a href="/recovery"> Forgot password? </a>
                    </Form.Text>
                </Form.Group>
            {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check custom type="checkbox" variant="primary" label="Remember me" />
            </Form.Group> */}
                <Button variant="primary" type="submit" block>
                    Sign In
                </Button>
                <Form.Text className="forgot-password text-center">
                    Don't have an account? <a href="/register">Sign up</a>
                </Form.Text>
            </Form>
        )
    }
}

export default Login