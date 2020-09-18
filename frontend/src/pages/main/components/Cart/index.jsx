import React, { Component } from "react";
import { connect } from "react-redux";
import {
  withStyles,
  Container,
  Typography,
  Link,
  Grid,
} from "@material-ui/core";
import { Header, Footer } from "../../../components";

const useStyles = (theme) => ({});

class Cart extends Component {
  constructor(props) {
    super(props)
  }
  debugger
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <Container component="main" maxWidth="lg">
        <Typography variant="h1">{`Cart ${this.props.books.books.id}`}</Typography>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store) => ({
  books: store.books,
});

export default connect(
  mapStateToProps,
  null
)(withStyles(useStyles)(Cart));