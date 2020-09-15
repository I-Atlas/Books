import React, { Component } from "react";
import moment from "moment";
import {
  Grid,
  TextField,
  Container,
  Paper,
  Avatar,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import UserService from "../../../../services/user";
import { Header, Footer } from "../../../components";
import { BookModal } from "../../components";
import { successToast } from "../../../components/Toast";

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    margin: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    marginTop: theme.spacing(1),
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    margin: theme.spacing(1),
    height: "120px",
    width: "120px",
  },
  form: {
    textAlign: "center",
    width: "100%",
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      usernameError: "",
      first_name: "",
      last_name: "",
      avatar: null,
      avatarError: "",
      password: "",
      passwordError: "",
      message: "",
      successful: false,
    };

    this.user = JSON.parse(localStorage.getItem("user"));

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  errorsClear() {
    this.setState({
      usernameError: "",
      passwordError: "",
    });
  }

  formValidation() {
    const spaceValidation = /^\S*$/;

    if (
      this.state.username.toString().length < 1 ||
      !spaceValidation.test(this.state.username)
    ) {
      this.errorsClear();
      return this.setState({ usernameError: "Incorrect Username" });
    }
  }

  handleInputChange(event) {
    this.setState({
      avatar: event.target.files[0],
    });
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

    UserService.update(
      this.state.username,
      this.state.first_name,
      this.state.last_name,
      this.state.password,
      this.state.avatar
    )
      .then((response) => {
        this.setState({
          message: response.message,
          successful: true,
        });
        successToast(response.message);
        console.log(response.message);
      })
      .catch((error) => {
        const resMessage =
          (error.response && error.response.data && error.response.message) ||
          error.message ||
          error.toString();
        debugger;

        if (error.response.message === "Username is missing") {
          this.errorsClear();
          return this.setState({ usernameError: error.response.message });
        }

        if (error.response.error) {
          this.errorsClear();
          return this.setState({ passwordError: error.response.error });
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
        <Container component="main" maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Avatar
                  className={classes.avatar}
                  src={
                    this.user.avatar
                      ? `http://localhost:5000/images/${this.user.avatar}`
                      : `${(<AccountCircleIcon />)}`
                  }
                />
                <Typography variant="h3">{this.user.username}</Typography>
                {this.user.first_name && this.user.last_name ? (
                  <Typography className={classes.text} variant="body1">
                    {`${this.user.first_name} ${this.user.last_name}`}
                  </Typography>
                ) : null}
                <Typography className={classes.text} variant="body1">
                  {this.user.email}
                </Typography>
                <Typography className={classes.text} variant="body1">
                  Joined at: {moment(this.user.createdAt).format("DD/MM/YYYY")}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                  <Typography component="h1" variant="h4">
                    Edit Profile
                  </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    error={Boolean(this.state.usernameError)}
                    helperText={this.state.usernameError}
                    value={`${this.state.username}`}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    autoComplete="first_name"
                    autoFocus
                    value={`${this.state.first_name}`}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="last_name"
                    label="Last Name"
                    id="last_name"
                    autoComplete="last_name"
                    value={`${this.state.last_name}`}
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
                  <Grid item xs>
                    <Button
                      variant="contained"
                      fullWidth
                      className={classes.submit}
                      component="label"
                    >
                      Upload File
                      <input
                        onChange={this.handleInputChange}
                        name="avatar"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/gif"
                        style={{ display: "none" }}
                      />
                    </Button>
                    <span>
                      {this.state.avatar
                        ? this.state.avatar.name
                        : "No file selected"}
                    </span>
                  </Grid>
                  <Grid item xs>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <BookModal />
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Profile);
