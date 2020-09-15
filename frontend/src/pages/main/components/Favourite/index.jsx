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

class Favourite extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <Container component="main" maxWidth="lg">
        <Typography variant="h1">Favourite</Typography>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Favourite);
