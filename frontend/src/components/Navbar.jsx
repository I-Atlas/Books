import React, { Component } from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"

class Header extends Component {
    render() {
        return (
            <Router>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/register">Book Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form inline>
                            <Form.Control type="text" className=" mr-sm-2"/>
                            <Button variant="outline-primary">Search</Button>
                        </Form>
                        <Nav className="mr-auto">
                            <Nav.Link href="/login">Account</Nav.Link>
                            <Nav.Link href="/register">Cart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>    
                </Navbar>
        </Router>
        )
    }
}

export default Header