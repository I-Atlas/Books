import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class Recovery extends Component {
    render() {
        return (
            <Form>
                <h3>Recovery</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username or email address</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                    Submit
                </Button>
            </Form>
        )
    }
}

export default Recovery