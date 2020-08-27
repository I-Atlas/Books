const db = require('../models')

const getAllBooks = async (req, res) => {
    try {
        const bookList = await db.Book.findAll();

        return res.json(bookList)

    } catch (error) {
        console.log('Get All Books Error:', error)
        return res.status(500).json({ error: error.message })
    }
}

const createNewBook = async (req, res) => {
    const {
        name,
        description,
        price,
        example,
        author,
        image,
        rating,
        category
    } = req.body
    
    try {
        db.Book.create({
            name,
            description,
            price,
            example,
            author,
            image,
            rating,
            category
        })

        return res.status(201).json({ message: "Book successfully created!" })

    } catch (error) {
        console.log('Create New Book Error:', error)
        return res.status(500).json({ error: error.message })
    }
}

const updateBookInfo = async (req, res) => {
    const {
        name,
        description,
        price,
        example,
        author,
        image,
        rating,
        category
    } = req.body
    
    try {
        db.Book.update({
            name,
            description,
            price,
            example,
            author,
            image,
            rating,
            category
        }, { where: { id } })

        return res.status(200).json({ message: "Book information successfully updated!" })

    } catch (error) {
        console.log('Update Book Information Error:', error)
        return res.status(500).json({ error: error.message })
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.body

    try {
        await db.Book.destroy({ where: { id } })
        
        return res.status(200).json({ message: "Book successfully deleted." })

    } catch (error) {
        console.log('Delete Book Error:', error);
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllBooks,
    createNewBook,
    updateBookInfo,
    deleteBook
}