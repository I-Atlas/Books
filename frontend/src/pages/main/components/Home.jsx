import React, { Component } from 'react';
import { Avatar,
         Button,
         CssBaseline,
         TextField,
         Grid,
         Typography,
         Container,
         withStyles } from '@material-ui/core'
import HelpRounded from '@material-ui/icons/HelpRounded'
import { Header, Footer } from '../../components/'

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(50),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    }
})

class Home extends Component {
    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Header />
                <Footer />
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(Home)