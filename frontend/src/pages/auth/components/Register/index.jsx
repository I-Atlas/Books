import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  withStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Header, Footer } from "../../../components";
import AuthService from "../../../../services/auth";
import { defaultToast } from "../../../components/Toast";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(32),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      usernameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      message: "",
      successful: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  errorsClear() {
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: "",
    });
  }

  formValidation() {
    const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const spaceValidation = /^\S*$/;

    if (
      this.state.username.toString().length < 1 ||
      !spaceValidation.test(this.state.username)
    ) {
      this.errorsClear();
      return this.setState({ usernameError: "Username is missing" });
    }

    if (!emailValidation.test(this.state.email)) {
      this.errorsClear();
      return this.setState({ emailError: "Email must be email" });
    }

    if (
      this.state.password.toString().length < 6 ||
      !spaceValidation.test(this.state.password)
    ) {
      this.errorsClear();
      return this.setState({
        passwordError:
          "Password must contain at least 6 characters and no spaces",
      });
    }
  }

  handleChange(event) {
    this.errorsClear();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.formValidation();

    this.setState({
      message: "",
      successful: false,
    });

    AuthService.register(
      this.state.username,
      this.state.email,
      this.state.password
    )
      .then((data) => {
        this.setState({
          message: data.message,
          successful: true,
        });
        debugger;
        defaultToast(data.message);
        this.props.history.push(`/login`);
        console.log(data.message);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        debugger
        if (error.response.data.message === "Email already used") {
          this.errorsClear();
          return this.setState({ emailError: error.response.data.message });
        }

        this.setState({
          successful: false,
          message: resMessage,
        });
      });
  }

  render() {
    const { classes } = this.props;
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
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <React.Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="username"
                      variant="outlined"
                      required
                      fullWidth
                      id="userName"
                      label="Username"
                      autoFocus
                      error={Boolean(this.state.usernameError)}
                      helperText={this.state.usernameError}
                      value={`${this.state.username}`}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      error={Boolean(this.state.emailError)}
                      helperText={this.state.emailError}
                      value={`${this.state.email}`}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      error={Boolean(this.state.passwordError)}
                      helperText={this.state.passwordError}
                      value={`${this.state.password}`}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </React.Fragment>
            </form>
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(useStyles)(Register));
