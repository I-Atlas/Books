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
  Link
} from "@material-ui/core";
import { Favorite, AddShoppingCart, Create, Search } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import BookService from "../../../../services/book";
import { getBooks } from "../../../../store/actionCreators/books";

const useStyles = (theme) => ({
  container: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(8),
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
    };

    this.handleSearchBook = this.handleSearchBook.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    // this.handleCartClick = this.handleCartClick.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.getBooks();
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

  // handleCartClick() {
  //   let order = [];

  //   if (localStorage.getItem("cart")) {
  //     order = JSON.parse(localStorage.getItem("cart"));
  //   }

  //   const currentBook = order.find((item) => item.id === this.state.books.id);
  //   console.log(currentBook);
  // }

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
                <Link href={`books/${book.id}`}>
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
                    <IconButton aria-label="update">
                      <Create />
                    </IconButton>
                  </CardActions>
                </Card>
                      </Link>
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

            {/* <FormControl variant="outlined" size="small">
              <Select onChange={this.handlePageSizeChange} value={pageSize}>
                {this.pageSizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
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
