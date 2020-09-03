import React, { Component } from 'react';
import {
    CardMedia,
    CardContent,
    CardHeader,
    CardActions,
    Card,
    Grid,
    GridList,
    Typography,
    withStyles,
    IconButton 
} from '@material-ui/core'
import { Favorite, AddShoppingCart } from '@material-ui/icons'
import BookService from '../../../../services/book'

const useStyles = theme => ({
    container: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
      cardContent: {
        // fontWeight: 'bolder',
        flexGrow: 1,
    }
})

class BookCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            description: "",
            price: "",
            example: "",
            author: "",
            image: "",
            rating: "",
            res: [],
            successful: false,
        };

        this.books = BookService.getAllBooks().then((response) => {
            const resArr = []
            
            for (let i in response) {
                resArr.push(response[i])
            }
            console.log(resArr)
            this.setState({
                res: resArr
            })
        })
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Grid
                    container
                    className={classes.container}
                    spacing={4}
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {this.state.res.map((book, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                            <CardHeader
                                title={book.name}
                                subheader={book.author}
                            />
                            {book.image ?
                            <CardMedia
                                className={classes.cardMedia}
                                image={book.image}
                            />
                            : <CardMedia
                                className={classes.cardMedia}
                                image="https://source.unsplash.com/random"
                            />
                            }
                            <CardContent className={classes.cardContent}>
                                <Typography variant="h5">
                                    {`${book.price} ₽`}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="add to favorites">
                                    <Favorite />
                                </IconButton>
                                <IconButton aria-label="add to cart">
                                    <AddShoppingCart />
                                </IconButton>
                            </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(BookCard)