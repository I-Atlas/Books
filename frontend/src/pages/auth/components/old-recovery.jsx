import React, { Component } from "react"
import axios from 'axios'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"



class RecoveryOld extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
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
            email,
        } = this.state

        axios.post("http://localhost:3000/recover",
            { 
                user: {
                    email: email,
                }
            },
            {
                withCredentials: true
            })
            .then(response => {
                if (response.data.recovered) {
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
            <Form>
                <h3>Recovery</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                </Form.Group>
                <Button variant="primary" type="submit" block>
                    Submit
                </Button>
            </Form>
        )
    }
}

export default RecoveryOld