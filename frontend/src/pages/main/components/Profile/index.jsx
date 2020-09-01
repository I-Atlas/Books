import React, { Component } from 'react'
import moment from 'moment'
import { 
    Box,
    Grid,
    TextField,
    Container,
    Paper,
    Avatar,
    DialogTitle,
    useMediaQuery,
    Typography,
    withStyles
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import UserService from "../../../../services/user"
import { Header, Footer } from '../../../components'
import { BookModal } from '../../components'

const useStyles = theme => ({
    paper: {
        padding: theme.spacing(4),
        color: theme.palette.text.secondary,
        margin: theme.spacing(4),
        display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center'
    },
    emailText: {
        marginTop: theme.spacing(1),
        color: theme.palette.text.secondary
    },
    dateText: {
        color: theme.palette.text.secondary
    },
    details: {
        display: 'flex'
    },
    avatar: {
        marginLeft: 'auto',
        height: '110px',
        width: '110px',
        flexShrink: 0,
        flexGrow: 0
    },
})



class Profile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username: "",
            usernameError: "",
            firstName: "",
            firstNameError: "",
            lastName: "",
            lastNameError: "",
            password: "",
            passwordError: "",
            message: "",
            successful: false
        }
    
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
    
      errorsClear() {
        this.setState({
          nameError: '',
          priceError: '',
        })
      }
    
      formValidation() {
        const spaceValidation = /^\S*$/

        if (this.state.username.toString().length < 1 || !spaceValidation.test(this.state.username)) {
            this.errorsClear();
            return this.setState({ usernameError: 'Username is missing' })
        }
      }
    
      handleChange(event) {
        this.errorsClear()
        this.setState({
            [event.target.name]: event.target.value
        })
      }
    
      handleSubmit(event) {
        console.log('submit');
        
        event.preventDefault()
    
        this.formValidation()
    
        this.setState({
          message: "",
          successful: false
        })
    
        UserService.update(
            this.state.username,
            this.state.firstName,
            this.state.lastName,
            this.state.password
        )
        .then (
            response => {
              this.setState({
                message: response.data.message,
                successful: true
              })
              console.log(response.data.message)
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            
                // if (error.response.data.message === 'Name is missing') {
                //     this.errorsClear()
                //     return this.setState({ nameError: error.response.data.message });
                // }
    
                // if (error.response.data.message === 'Price must contain numbers') {
                //   this.errorsClear()
                //   return this.setState({ priceError: error.response.data.message });
                // }
                
                // if (error.response.data.message === 'Rating must contain numbers') {
                //   this.errorsClear()
                //   return this.setState({ ratingError: error.response.data.message });
                // }
    
            this.setState({
                successful: false,
                message: resMessage
            })
          }
        )
      }
    render() {
        const user = JSON.parse(localStorage.getItem('user'))
        const { classes } = this.props
        return (
            <React.Fragment>
                <Header />
                <Container component="main" maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                            <div className={classes.details}>
                                <div className={classes.info}>
                                    <Typography variant="h3">{user.username}</Typography>
                                    <Typography className={classes.emailText} variant="body1">
                                        {user.email}
                                    </Typography>
                                    <Typography className={classes.dateText} variant="body1">
                                        Joined at: {moment(user.createdAt).format('DD/MM/YYYY')}
                                    </Typography>
                                </div>
                            </div>
                            <Avatar
                                className={classes.avatar}
                                src={user.avatar ? user.avatar : `${<AccountCircleIcon />}`}
                            />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
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
                                >
                                    Sign In
                                </Button>
                            </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <BookModal />
                <Footer />
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(Profile)