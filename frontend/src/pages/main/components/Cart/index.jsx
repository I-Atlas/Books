import React, { Component } from "react";
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
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <Container component="main" maxWidth="lg">
        <Typography variant="h1">Cart</Typography>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Cart);
