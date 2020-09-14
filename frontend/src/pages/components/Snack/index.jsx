import React, { Component } from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

class Snack extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }

        // this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    // handleOpen() {
    //     this.setState({
    //         open: true
    //     })
    // }
    
    handleClose(event) {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
        )
    }
}

export default new Snack()