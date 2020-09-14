import React, { Component } from "react";
import { Container, withStyles, Paper, Typography } from "@material-ui/core";
import { BookCard, SortBookModal } from "../../components";
import { Header, Footer } from "../../../components";

const useStyles = (theme) => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <SortBookModal />
        <Container maxWidth="lg">
          <BookCard />
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Home);
