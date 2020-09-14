import React, { Component } from "react";
import {
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Card,
  Grid,
  Typography,
  TextField,
  withStyles,
  IconButton,
} from "@material-ui/core";
import {
  Favorite,
  AddShoppingCart,
  Create,
  Search,
} from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import BookService from "../../../../services/book";

const useStyles = (theme) => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  pag: {
    alignItems: "center",
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
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.pageSizes = [3, 6, 9];
    // this.books = BookService.getAllBooks().then((response) => {
    //   const responseArray = [];
    //   for (let i in response) {
    //     responseArray.push(response[i]);
    //   }
    //   this.setState({
    //     res: responseArray,
    //   });
    // });
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

  render() {
    const { searchBook, res, page, count, pageSize } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.pag}>
          <TextField
            name="category"
            variant="outlined"
            fullWidth
            label="Search by book title"
            id="category"
            // error={Boolean(this.state.categoryError)}
            // helperText={this.state.categoryError}
            value={`${searchBook}`}
            onChange={this.handleSearchBook}
          />
          <IconButton type="submit" aria-label="search" onClick={this.getBooks}>
            <Search />
          </IconButton>
          <div className="mt-3">
            {"Items per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
          </div>
          <Grid
            container
            className={classes.container}
            spacing={4}
            justify="flex-start"
            alignItems="flex-start"
          >
            {res && res.map((book, id) => (
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
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(BookCard);
