import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { PersonOutline, ShoppingBasketOutlined, FavoriteBorderOutlined } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
});

class Header extends Component {
    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Toolbar className={classes.toolbar}>
                    <Button href="/">
                        <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                        
                        >
                        Books
                        </Typography>
                    </Button>
                    
                    <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                    >
                    
                    </Typography>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <PersonOutline />
                    </IconButton>
                    <IconButton>
                        <FavoriteBorderOutlined />
                    </IconButton>
                    <IconButton>
                        <ShoppingBasketOutlined />
                    </IconButton>
                </Toolbar>
            </React.Fragment>
        )
    }
}


export default withStyles(useStyles)(Header)