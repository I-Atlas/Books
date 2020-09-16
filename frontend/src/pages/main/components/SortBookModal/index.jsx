import React, { Component } from "react";
import {
  FormControl,
  FormControlLabel,
  DialogTitle,
  DialogContent,
  Dialog,
  Grid,
  FormHelperText,
  FormGroup,
  Checkbox,
  withStyles,
  TextField,
  Fab,
  FormLabel,
} from "@material-ui/core";
import { Favorite, AddShoppingCart, Sort } from "@material-ui/icons";
import BookService from "../../../../services/book";

const useStyles = (theme) => ({
  title: {
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  form: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  fab: {
    position: "fixed",
    right: theme.spacing(3),
    bottom: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(2, 0, 2),
    width: "100%",
  },
});

class SortBookModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_item: "",
      order_type: "",
      fantasy: false,
      comedy: false,
      adventure: false,
      romance: false,
      //   contemporary: false,
      //   dystopian: false,
      //   mystery: false,
      //   horror: false,
      //   thriller: false,
      category: "",
      res: [],
      open: false,
      successful: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
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

  handleClick() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleChange(event) {
    // this.errorsClear();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleCheck(event) {
    // this.errorsClear();
    this.setState({
      //   [event.target.checked]: true,
      [event.target.name]: event.target.checked,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Fab
          color="secondary"
          aria-label="sort"
          className={classes.fab}
          onClick={this.handleClick}
        >
          <Sort />
        </Fab>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="responsive-dialog-title" className={classes.title}>
            {"Sort Books"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Title"
                    autoFocus
                    error={Boolean(this.state.nameError)}
                    helperText={this.state.nameError}
                    value={`${this.state.name}`}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    // error={error}
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.fantasy}
                            onChange={this.handleCheck}
                            name="fantasy"
                          />
                        }
                        label="Fantasy"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.comedy}
                            onChange={this.handleCheck}
                            name="comedy"
                          />
                        }
                        label="Comedy"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.adventure}
                            onChange={this.handleCheck}
                            name="adventure"
                          />
                        }
                        label="Adventure"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.romance}
                            onChange={this.handleCheck}
                            name="romance"
                          />
                        }
                        label="Romance"
                      />
                    </FormGroup>
                    <FormHelperText>You can display an error</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(SortBookModal);
