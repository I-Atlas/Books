import React from "react"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
// import Header from '../../components/Navbar'

import { Login, Register, Recovery } from './components'

function Auth() {
    return (
        <Router>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/register">Book Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>
                <Form inline>
                    <Form.Control type="text" className="mr-sm-2"/>
                    <Button variant="outline-primary">Search</Button>
                </Form>
                <Nav className="ml-auto">
                    <Nav.Link href="/login">Account</Nav.Link>
                    <Nav.Link href="/register">Cart</Nav.Link>
                </Nav>    
            </Navbar>
            <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path='/register' component={Register} />
                            <Route path="/login" component={Login} />
                            <Route path="/recovery" component={Recovery} />
                        </Switch>
                    </div>
            </div>
            {/* <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/"}>Books</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/"}>Sign up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path='/' component={Register} />
                            <Route path="/login" component={Login} />
                            <Route path="/recovery" component={Recovery} />
                        </Switch>
                    </div>
                </div>
            </div> */}
        </Router>
    )
}

export default Auth