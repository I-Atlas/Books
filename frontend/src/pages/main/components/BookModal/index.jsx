import React, { Component } from 'react'
import { 
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withStyles,
  Fab
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import BookService from '../../../../services/book'

const useStyles = theme => ({
  title: {
      textAlign: 'center'
  },
  fab: {
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
  },
})

class BookModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      nameError: "",
      description: "",
      price: "",
      priceError: "",
      example: "",
      author: "",
      rating: "",
      ratingError: "",
      message: "",
      successful: false,
      open: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  errorsClear() {
    this.setState({
      nameError: '',
      priceError: '',
    })
  }

  formValidation() {

  }

  // fullScreen() {
  //   useMediaQuery(useTheme().breakpoints.down('sm'))
  // }

  handleClick() {
    this.setState({
      open: true
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  handleChange(event) {
    this.errorsClear()
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    console.log('submit');
    
    event.preventDefault()

    // this.formValidation()

    this.setState({
      message: "",
      successful: false
    })

    BookService.create(
        this.state.name,
        this.state.description,
        this.state.price,
        this.state.example,
        this.state.author,
        this.state.rating
    )
    .then (
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          })
          console.log(response.data.message)
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        
            if (error.response.data.message === 'Name is missing') {
                this.errorsClear()
                return this.setState({ nameError: error.response.data.message });
            }

            if (error.response.data.message === 'Price must contain numbers') {
              this.errorsClear()
              return this.setState({ priceError: error.response.data.message });
            }
            
            if (error.response.data.message === 'Rating must contain numbers') {
              this.errorsClear()
              return this.setState({ ratingError: error.response.data.message });
            }

        this.setState({
            successful: false,
            message: resMessage
        })
      }
    )
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
          <Fab color="secondary"
            aria-label="add"
            className={classes.fab}
            onClick={this.handleClick}
          >
            <AddIcon />
          </Fab>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
          >
          <DialogTitle 
            id="responsive-dialog-title"
            className={classes.title}
          >
            {"Create new book"}
          </DialogTitle>
            <DialogContent>
              <form onSubmit={this.handleSubmit}>
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
                    <TextField
                      name="description"
                      variant="outlined"
                      fullWidth
                      id="description"
                      label="Description"
                      value={`${this.state.description}`}
                      onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                      name="price"
                      variant="outlined"
                      fullWidth
                      label="Price"
                      id="price"
                      error={Boolean(this.state.priceError)}
                      helperText={this.state.priceError}
                      value={this.state.price}
                      onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                      name="example"
                      variant="outlined"
                      fullWidth
                      label="Example text"
                      id="example"
                      value={`${this.state.example}`}
                      onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                      name="author"
                      variant="outlined"
                      fullWidth
                      label="Author"
                      id="author"
                      value={`${this.state.author}`}
                      onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                      name="rating"
                      variant="outlined"
                      fullWidth
                      label="Rating"
                      id="rating"
                      error={Boolean(this.state.ratingError)}
                      helperText={this.state.ratingError}
                      value={this.state.rating}
                      onChange={this.handleChange}
                    />
                    </Grid>
                </Grid>

          <DialogActions>
            <Button 
              autoFocus
              onClick={this.handleClose} 
              color="primary"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              onClick={this.handleClose}
              color="primary"
              autoFocus
            >
              Sumbit
            </Button>
          </DialogActions>
              </form>
            </DialogContent>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(BookModal)