import React, { Component } from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"

class Header extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Book Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline>
                        <Form.Control type="text" className=" mr-sm-2"/>
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                    <Nav className="mr-auto">
                        <Nav.Link href="/login">Account</Nav.Link>
                        <Nav.Link href="/">Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>    
            </Navbar>
        )
    }
}

export default Header