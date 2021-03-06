import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Card,
  Grid,
  Typography,
  withStyles,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
} from "@material-ui/core";
import {
  Favorite,
  AddShoppingCart,
  Create,
  Search,
  Close,
  AllOutOutlined,
} from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import BookService from "../../../../services/book";
import { getBooks } from "../../../../store/actionCreators/books";

const useStyles = (theme) => ({
  container: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    margin: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  title: {
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  search: {
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1),
  },
  pagination: {
    flexGrow: 1,
  },
  select: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    textAlign: "center",
  },
});

class BookCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      totalBooks: 0,
      totalPages: 0,
      currentPage: 1,
      currentPageSize: 9,
      searchBook: "",
      orderType: "ASC",
      orderItem: "name",
      successful: false,
      open: false,
    };

    this.handleSearchBook = this.handleSearchBook.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.handleCartClick = this.handleCartClick.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.getBooks();
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

  getRequestParams(searchBook, currentPage, currentPageSize) {
    let params = {};

    if (searchBook) {
      params["name"] = searchBook;
    }

    if (currentPage) {
      params["page"] = currentPage - 1;
    }

    if (currentPageSize) {
      params["size"] = currentPageSize;
    }

    return params;
  }

  getBooks() {
    const { searchBook, currentPage, currentPageSize } = this.state;
    const params = this.getRequestParams(
      searchBook,
      currentPage,
      currentPageSize
    );

    this.props
      .getBooks(params)
      .then(() => {
        this.setState({
          books: this.props.books.books,
          totalBooks: this.props.books.totalBooks,
          totalPages: this.props.books.totalPages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        currentPage: value,
      },
      () => {
        this.getBooks();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        currentPageSize: event.target.value,
        currentPage: 1,
      },
      () => {
        this.getBooks();
      }
    );
  }

  handleSearchBook(event) {
    this.setState({
      searchBook: event.target.value,
    });
  }

  render() {
    const {
      books,
      totalBooks,
      totalPages,
      currentPage,
      currentPageSize,
      searchBook,
    } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.search}>
          <Grid container>
            <FormControl fullWidth>
              <InputLabel htmlFor="search">Search</InputLabel>
              <Input
                id="search"
                value={`${searchBook}`}
                onChange={this.handleSearchBook}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      aria-label="search"
                      onClick={this.getBooks}
                      edge="end"
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </div>
        <Grid
          container
          className={classes.container}
          spacing={4}
          justify="flex-start"
          alignItems="flex-start"
        >
          {books &&
            books.map((book, id) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardHeader title={book.name} subheader={book.author} />
                  {book.image ? (
                    <CardMedia
                      className={classes.cardMedia}
                      image={`http://localhost:5000/images/${book.image}`}
                    />
                  ) : (
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                    />
                  )}
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h5">{`${book.price} ₽`}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="add to favorites">
                      <Favorite />
                    </IconButton>
                    <IconButton aria-label="add to cart">
                      <AddShoppingCart />
                    </IconButton>
                    <IconButton aria-label="expand" onClick={this.handleClick}>
                      <AllOutOutlined />
                    </IconButton>
                    <Dialog
                      fullScreen
                      open={this.state.open}
                      onClose={this.handleClose}
                    >
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={this.handleClose}
                        aria-label="close"
                      >
                        <Close />
                      </IconButton>
                      <DialogTitle
                        variant="h1"
                        id="expand-book-card"
                        className={classes.title}
                      >
                        {book.name} | {book.author}
                      </DialogTitle>
                      <DialogContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                              <img
                                src={
                                  book.image
                                    ? `http://localhost:5000/images/${book.image}`
                                    : `https://source.unsplash.com/random`
                                }
                                alt={book.name}
                                className={classes.image}
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                          <Paper className={classes.paper}>
                              <Typography variant="h3">{`${book.price} ₽`}</Typography>
                              <Button autoFocus color="primary">
                                Add to cart
                              </Button>
                            <List>
                              <ListItem>
                                <ListItemText
                                  primary="About"
                                  secondary={book.description}
                                />
                              </ListItem>
                              <Divider variant="middle" />
                              <ListItem>
                                <ListItemText
                                  primary="Text example"
                                  secondary={book.example}
                                />
                              </ListItem>
                              <Divider variant="middle" />
                              <ListItem>
                                <ListItemText
                                  primary="Rating"
                                  secondary={book.rating}
                                />
                              </ListItem>
                            </List>
                            </Paper>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
        <div className={classes.pagination}>
          <Grid container justify="center">
            <FormControl
              variant="outlined"
              size="small"
              className={classes.select}
            >
              <Select
                onChange={this.handlePageSizeChange}
                value={currentPageSize}
              >
                {this.pageSizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Pagination
              color="primary"
              variant="outlined"
              shape="rounded"
              count={totalPages}
              page={currentPage}
              siblingCount={1}
              boundaryCount={1}
              onChange={this.handlePageChange}
              size="large"
              justify="center"
            />
            <Paper variant="outlined" className={classes.select}>
              <Typography variant="h6" display="block">
                {totalBooks} items
              </Typography>
            </Paper>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store) => ({
  books: store.books,
});

const mapDispatchToProps = {
  getBooks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(BookCard));
