import React, { Component } from "react";
import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withStyles,
  Fab,
} from "@material-ui/core";
import { Rating } from '@material-ui/lab'
import AddIcon from "@material-ui/icons/Add";
import BookService from "../../../../services/book";
import { Snack } from "../../../components";

const useStyles = (theme) => ({
  title: {
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  fab: {
    position: "fixed",
    right: theme.spacing(3),
    bottom: theme.spacing(3),
  },
  form: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  upload: {
    margin: theme.spacing(2, 0, 2),
  }
});

class BookModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nameError: "",
      description: "",
      price: "",
      priceError: "",
      example: "",
      author: "",
      rating: 0,
      ratingError: "",
      category: "",
      categoryError: "",
      image: null,
      message: "",
      successful: false,
      open: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  errorsClear() {
    this.setState({
      nameError: "",
      priceError: "",
    });
  }

  formValidation() {}

  handleInputChange(event) {
    this.setState({
      image: event.target.files[0],
    });
  }

  handleClick() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
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

    // this.formValidation()

    this.setState({
      message: "",
      successful: false,
    });

    BookService.create(
      this.state.name,
      this.state.description,
      this.state.price,
      this.state.example,
      this.state.author,
      this.state.rating,
      this.state.category,
      this.state.image
    ).then(
      (response) => {
        this.setState({
          message: response.data.message,
          successful: true,
        });
        console.log(response.data.message);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.response.data.message === "Name is missing") {
          this.errorsClear();
          return this.setState({ nameError: error.response.data.message });
        }

        if (error.response.data.message === "Price must contain numbers") {
          this.errorsClear();
          return this.setState({ priceError: error.response.data.message });
        }

        // if (error.response.data.message === "Rating must contain numbers") {
        //   this.errorsClear();
        //   return this.setState({ categoryError: error.response.data.message });
        // }

        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {/* { this.state.successful && (
          <Snack />
        ) } */}
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={this.handleClick}
        >
          <AddIcon />
        </Fab>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="responsive-dialog-title" className={classes.title}>
            {"Create new book"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Title"
                    autoFocus
                    error={Boolean(this.state.nameError)}
                    helperText={this.state.nameError}
                    value={`${this.state.name}`}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    variant="outlined"
                    fullWidth
                    id="description"
                    label="Description"
                    value={`${this.state.description}`}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="price"
                    variant="outlined"
                    fullWidth
                    label="Price"
                    id="price"
                    error={Boolean(this.state.priceError)}
                    helperText={this.state.priceError}
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="example"
                    variant="outlined"
                    fullWidth
                    label="Example text"
                    id="example"
                    value={`${this.state.example}`}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="author"
                    variant="outlined"
                    fullWidth
                    label="Author"
                    id="author"
                    value={`${this.state.author}`}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="category"
                    variant="outlined"
                    fullWidth
                    label="Category"
                    id="category"
                    // error={Boolean(this.state.categoryError)}
                    // helperText={this.state.categoryError}
                    value={`${this.state.category}`}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Rating 
                    name='rating'
                    size="large"
                    defaultValue={1}
                    precision={1}
                    max={5}
                    value={this.state.rating}
                    onChange={this.handleChange}
                    // error={Boolean(this.state.ratingError)}
                    // helperText={this.state.ratingError}
                  />
                </Grid>
                <Grid item xs>
                    <Button
                      variant="contained"
                      fullWidth
                      className={classes.submit}
                      component="label"
                      className={classes.upload}
                    >
                      Upload File
                      <input
                        onChange={this.handleInputChange}
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/gif"
                        style={{ display: "none" }}
                      />
                    </Button>
                    <span>{this.state.image ? this.state.image.name : 'No file selected'}</span>
                  </Grid>
              </Grid>

              <DialogActions>
                <Button autoFocus onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={this.handleClose}
                  color="primary"
                  autoFocus
                >
                  Sumbit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(BookModal);
