import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { Avatar,
         Button,
         CssBaseline,
         TextField,
         FormControlLabel,
         Checkbox,
         Link,
         Grid,
         Typography,
         Container,
         withStyles } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Header, Footer } from '../../../components'
import AuthService from "../../../../services/auth"
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(33),
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

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            emailError: "",
            password: "",
            passwordError: "",
            message: "",
            open: false,
            setOpen: false,
            successful: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClick() {
        this.setState({
            setOpen: true
        })
    }
    
    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        this.setState({
            setOpen: false
        })
    }

    errorsClear() {
        this.setState({
          emailError: '',
          passwordError: '',
        })
    }

    handleChange(event) {
        this.errorsClear()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async timeout(ms) {
        await new Promise(resolve => setTimeout(resolve, ms))
      }

    async handleSubmit(event) {
        event.preventDefault()

        this.setState({
            message: "",
            successful: false
        })

        AuthService.login(
            this.state.email,
            this.state.password
        )
        .then (
            async () => {
                this.setState({
                    successful: true
                })
                this.props.history.push("/")
                window.location.reload()
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()

                if (error.response.data.message === 'User not found') {
                    this.errorsClear()
                    this.setState({ emailError: 'User not found' });
                }
            
                if (error.response.data.message === 'Wrong email or password') {
                    this.errorsClear()
                    this.setState({ passwordError: error.response.data.message,
                                    emailError: error.response.data.message
                                 })
                }

              this.setState({
                successful: false,
                message: resMessage
                })
            }
        )
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Header />
                <Container component="main" maxWidth="xs"> 
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={Boolean(this.state.emailError)}
                        helperText={this.state.emailError}
                        value={`${this.state.email}`}
                        onChange={this.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={Boolean(this.state.passwordError)}
                        helperText={this.state.passwordError}
                        value={`${this.state.password}`}
                        onChange={this.handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        // onClick={this.handleClick}
                    >
                        Sign In
                    </Button>
                    {/* {this.state.successful ? (
                        <React.Fragment>
                            <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity="success">
                                    This is a success message!
                                </Alert>
                            </Snackbar>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity="error">
                                    This is a error message!
                                </Alert>
                            </Snackbar>
                        </React.Fragment>
                        )} */}
                    <Grid container>
                        <Grid item xs>
                        <Link href="/recovery" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(useStyles)(Login))