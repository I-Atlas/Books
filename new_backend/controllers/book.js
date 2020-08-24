const db = require('../models');

const getRandomPrice = (max) => {
    return Math.random() * max;
}

const getAllBooks = async (req, res) => {
    try {
        const bookList = await db.Book.findAll();
        return res.json(bookList)
    } catch (error) {
        console.log('getAllBooks error:', error);
        
        return res.status(500).json({error: error.message});
    }
}

const newBook = async (req, res) => {
    try {
        db.Book.create({
            name: "1984",
            description: "Своеобразный антипод второй великой антиутопии XX века - О дивный новый мир Олдоса Хаксли. Что, в сущности, страшнее: доведенное до абсурда общество потребления - или доведенное до абсолюта общество идеи По Оруэллу, нет и не может быть ничего ужаснее тотальной несвободы...",
            price: getRandomPrice(50).toFixed(2),
            example: "1984",
            author: "Оруэлл Джордж",
            image: "1984.png",
            rating: 4.9,
            category: "антиутопия"
        })
        return res.send('Book has been created!')
    } catch (error) {
        console.log('newBook error:', error);

        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    getAllBooks,
    newBook
}