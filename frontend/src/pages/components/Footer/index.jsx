import React, { Component } from "react";
import {
  withStyles,
  Container,
  Typography,
  Link,
  Grid,
} from "@material-ui/core";

const useStyles = (theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "auto",
    marginBottom: 0,
    padding: theme.spacing(6, 0),
  },
});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://github.com/I-Atlas/Books">
                Books
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Container>
        </footer>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Footer);
