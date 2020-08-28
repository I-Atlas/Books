import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
                    <Container maxWidth="lg">
                        <Typography variant="h6" align="right" gutterBottom>
                        Books
                        </Typography>
                        <Typography variant="subtitle1" align="left" color="textSecondary" component="p">
                        About
                        </Typography>
                        <Copyright />
                    </Container>
                </footer>
            </React.Fragment>
        )
    }
}


export default withStyles(useStyles)(Footer)