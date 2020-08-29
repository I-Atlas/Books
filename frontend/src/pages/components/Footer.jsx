import React, { Component } from 'react';
import { withStyles, Container, Typography, Link, Grid } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/I-Atlas/Books">
        Books
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 'auto',
    padding: theme.spacing(6, 0),
  },
});

class Footer extends Component {
    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <footer className={classes.footer}>
                    <Container maxWidth="sm">
                        <Copyright />
                    </Container>
                </footer>
                {/* <Container maxWidth="md" component="footer" className={classes.footer}>
                <Grid container spacing={4} justify="space-evenly">
                  {footers.map((footer) => (
                    <Grid item xs={6} sm={3} key={footer.title}>
                      <Typography variant="h6" color="textPrimary" gutterBottom>
                        {footer.title}
                      </Typography>
                      <ul>
                        {footer.description.map((item) => (
                          <li key={item}>
                            <Link href="#" variant="subtitle1" color="textSecondary">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Grid>
                  ))}
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </Container> */}
            </React.Fragment>
        )
    }
}


export default withStyles(useStyles)(Footer)