import React, { Component } from "react";
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
} from "@material-ui/core";
import { Favorite, AddShoppingCart, Create, Search, RotateRight } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import BookService from "../../../../services/book";

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
  },
});

class BookCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: [],
      page: 1,
      pageSize: 9,
      count: 0,
      searchBook: "",
      order_type: "ASC",
      order_item: "name",
      successful: false,
    };

    this.handleSearchBook = this.handleSearchBook.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.getBooks();
  }

  getRequestParams(searchBook, page, pageSize) {
    let params = {};

    if (searchBook) {
      params["name"] = searchBook;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  getBooks() {
    const { searchBook, page, pageSize } = this.state;
    const params = this.getRequestParams(searchBook, page, pageSize);

    BookService.getAllBooks(params)
      .then((data) => {
        const { books, totalPages } = data;

        this.setState({
          res: books,
          count: totalPages,
        });
        console.log(data);
        console.log(this.state.res.id)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.getBooks();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1,
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

  handleCartClick() {
    let order = []

    if (localStorage.getItem("cart")) {
      order = JSON.parse(localStorage.getItem("cart"))
    }

    const currentBook = order.find((item) => item.id === this.state.res.id)
    console.log(currentBook)
  }

  render() {
    const { searchBook, res, page, count, pageSize } = this.state;
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
          {res &&
            res.map((book, id) => (
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
                    <IconButton aria-label="update">
                      <Create />
                    </IconButton>
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
              <Select onChange={this.handlePageSizeChange} value={pageSize}>
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
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              onChange={this.handlePageChange}
              size="large"
              justify="center"
            />
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

export default withStyles(useStyles)(BookCard);
