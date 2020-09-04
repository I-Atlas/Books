import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles, Menu, MenuItem } from '@material-ui/core';
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
  menu: {
    marginTop: theme.spacing(5),
  }
});

class Header extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            anchorEl: null,
        }
    
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClick(event) {
        this.setState({
             anchorEl: event.currentTarget
        })
    }
    
    handleClose() {
        this.setState({
            anchorEl: null,
        })
    }

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
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                        <PersonOutline />
                    </IconButton>
                    <Menu
                        className={classes.menu}
                        id={"simple-menu"}
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        <Link to="/login" style={{ textDecoration: 'none', display: 'block' }}>
                            <MenuItem onClick={this.handleClose}>
                                Sing In
                            </MenuItem>
                        </Link>
                       
                        <Link to="/register" style={{ textDecoration: 'none', display: 'block' }}>
                            <MenuItem onClick={this.handleClose}>
                                Sing Up
                            </MenuItem>
                        </Link>
                    </Menu>
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