import React, { Component } from "react"
import axios from "axios"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class RegisterOld extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            errors: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        const {
            username,
            email,
            password
        } = this.state

        axios.post("http://localhost:3000/register",
            { 
                user: {
                    username: username,
                    email: email,
                    password: password
                }
            },
            {
                withCredentials: true
            })
            .then(response => {
                if (response.data.registered) {
                    this.props.handleSuccessful(response.data)
                }
            })
            .catch(error => {
                console.log(`Oh no! Something went wrong: ${error}`)
            })
        event.preventDefault()
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={this.state.username} onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={this.state.email} onChange={this.handleChange} required/>
                </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={this.state.password} onChange={this.handleChange} required/>
            </Form.Group>
                <Button variant="primary" type="submit" block>
                    Sign Up
                </Button>
                <Form.Text className="forgot-password">
                    Already registered? <a href="/login"> Sign in? </a>
                </Form.Text>
            </Form>
        )
    }
}

export default RegisterOld