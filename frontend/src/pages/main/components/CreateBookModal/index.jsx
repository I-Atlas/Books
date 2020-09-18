import React, { Component } from "react";
import { connect } from "react-redux";
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
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Rating, Autocomplete } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import BookService from "../../../../services/book";
import { successToast } from "../../../components/Toast";
import { getAuthors } from "../../../../store/actionCreators/authors";
import { getCategories } from "../../../../store/actionCreators/categories";

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
  },
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
      authors: [],
      author: "",
      author_id: null,
      rating: 0,
      ratingError: "",
      categories: [],
      category: "",
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
    this.handleGetAuthors = this.handleGetAuthors.bind(this);
    this.handleGetCategories = this.handleGetCategories.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
  }

  componentDidMount() {
    this.handleGetAuthors();
    this.handleGetCategories();
  }

  errorsClear() {
    this.setState({
      nameError: "",
      priceError: "",
    });
  }

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

  handleAuthorChange(event, val) {
    debugger
    this.errorsClear();
    // const author_id = this.state.authors.find(author => author.id === `${event.target.value}`)
    this.setState({
      author_id: val.id,
    });
    // console.log(author_id);
    
  }

  handleGetAuthors(event) {
    this.props
      .getAuthors()
      .then(() => {
        const mappedAuthors = this.props.authors.authors.map(author => author.id)
        this.setState({
          authors: this.props.authors.authors,
        });
        console.log(this.state.authors);
        console.log(mappedAuthors);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleGetCategories(event) {
    this.props
      .getCategories()
      .then(() => {
        this.setState({
          categories: this.props.categories.categories,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();

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
      this.state.author_id,
      this.state.category,
      this.state.rating,
      this.state.image
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

        if (error.response.data.message === "Name is missing") {
          this.errorsClear();
          return this.setState({ nameError: error.response.data.message });
        }

        if (error.response.data.message === "Price must contain numbers") {
          this.errorsClear();
          return this.setState({ priceError: error.response.data.message });
        }

        this.setState({
          successful: false,
          message: resMessage,
        });
      });
  }

  render() {
    const { authors, author, categories, category } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={this.handleClick}
        >
          <AddIcon />
        </Fab>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="create-book-modal" className={classes.title}>
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
                  <Autocomplete
                    options={authors}
                    getOptionLabel={(option) => option.name}
                    onChange={this.handleAuthorChange}
                    renderInput={(params) => (
                      <TextField
                      {...params}
                        id="author"
                        name="author"
                        label="Author"
                        variant="outlined"
                        fullWidth
                        value={`${author}`}
                        
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                      {...params}
                        id="category"
                        name="category"
                        label="Category"
                        variant="outlined"
                        fullWidth
                        value={`${category}`}
                        onChange={this.handleChange}
                    />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Rating
                    name="rating"
                    id="rating"
                    size="large"
                    defaultValue={1}
                    precision={1}
                    max={5}
                    value={this.state.rating}
                    onChange={this.handleChange}
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
                  <span>
                    {this.state.image
                      ? this.state.image.name
                      : "No file selected"}
                  </span>
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

const mapStateToProps = (store) => ({
  authors: store.authors,
  categories: store.categories,
});

const mapDispatchToProps = {
  getAuthors,
  getCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(BookModal));
