import React, { Component } from "react"
import axios from "axios"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class Login extends Component {
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

        axios.post("http://localhost:3000/login",
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
                if (response.data.logged) {
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
                <h3>Sign In</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username or email address</Form.Label>
                    <Form.Control type="email" value={this.state.email || this.state.username} onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={this.state.password} onChange={this.handleChange} required/>
                </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check custom type="checkbox" variant="primary" label="Remember me" />
            </Form.Group>
                <Button variant="primary" type="submit" block>
                    Sign In
                </Button>
                <Form.Text className="forgot-password text-center">
                    Don`t have an account? <a href="/register"> Sign up </a>
                    <span className="p-2">|</span>
                    <a href="/recovery"> Forgot password? </a>
                </Form.Text>
            </Form>
        )
    }
}

export default Login