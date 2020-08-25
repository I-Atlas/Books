const db = require('../models');

const getAllBooks = async (req, res) => {
    try {
        const bookList = await db.Book.findAll();

        return res.json(bookList)

    } catch (error) {
        console.log('Get All Books Error:', error);
        return res.status(500).json({error: error.message});
    }
}

const createNewBook = async (req, res) => {
    try {
        db.Book.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            example: req.body.example,
            author: req.body.author,
            image: req.body.image,
            rating: req.body.rating,
            category: req.body.category
        })

        return res.send('Book has been created!')

    } catch (error) {
        console.log('Create New Book Error:', error);
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    getAllBooks,
    createNewBook
}