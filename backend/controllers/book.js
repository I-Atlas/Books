const db = require("../models");
const {
    Op
} = db.Sequelize;

async function getBooks(req, res, next) {
    const {
        name,
        category,
        price,
        order_type = "ASC",
        order_item = "name",
        limit = 10,
        offset = 0,
    } = req.query;

    try {
        const filterOptions = {};

        if (name) {
            filterOptions.name = {
                [Op.iLike]: `%${name}%`
            }
        };

        if (category) {
            filterOptions.category = {
                category: category
            }
        }

        // if (price) {
        //     filterOptions.price = {
        //         // price: price
        //         [Op.iLike]: `%${price}%`,
        //     }
        // }
        // ...(name
        //   ? {
        //     name: {
        //         [Op.iLike]: `%${name}%`,
        //       },
        //     }
        //   : {}),
        // ...(category
        //   ? {
        //         category: category,
        //     }
        //   : {}),
        // ...(price
        //     ? {
        //       price: {
        //           [Op.iLike]: `%${price}%`,
        //         },
        //       }
        //     : {}),

        const dbQuery = {
            where: filterOptions,
            offset: +offset,
            order: [
                [order_item, order_type]
            ],
        };

        if (limit !== 0) {
            dbQuery.limit = limit || 9;
        }

        const books = await db.Book.findAndCountAll(dbQuery);
        // const books = await db.Book.findAndCountAll({})

        return res.status(200).json({
            books
        });
    } catch (error) {
        console.log("Get Books Error:", error);
        return res.status(500).json({
            error: error.message
        });
    }
}

const getAllBooks = async (req, res) => {
    try {
        const bookList = await db.Book.findAll();

        return res.json(bookList);
    } catch (error) {
        console.log("Get All Books Error:", error);
        return res.status(500).json({
            error: error.message
        });
    }
};

const createNewBook = async (req, res) => {
    const {
        name,
        description,
        price,
        example,
        author,
        image,
        rating,
        category,
    } = req.body;

    try {
        await db.Book.create({
            name,
            description,
            price,
            example,
            author,
            image,
            rating,
            category,
        });

        return res.status(201).json({
            message: "Book successfully created!"
        });
    } catch (error) {
        console.log("Create New Book Error:", error);
        return res.status(500).json({
            error: error.message
        });
    }
};

const updateBookInfo = async (req, res) => {
    const {
        name,
        description,
        price,
        example,
        author,
        image,
        rating,
        category,
    } = req.body;

    try {
        await db.Book.update({
            name,
            description,
            price,
            example,
            author,
            image,
            rating,
            category,
        }, {
            where: {
                id
            }
        });

        return res
            .status(200)
            .json({
                message: "Book information successfully updated!"
            });
    } catch (error) {
        console.log("Update Book Information Error:", error);
        return res.status(500).json({
            error: error.message
        });
    }
};

const deleteBook = async (req, res) => {
    const {
        id
    } = req.body;

    try {
        await db.Book.destroy({
            where: {
                id
            }
        });

        return res.status(200).json({
            message: "Book successfully deleted."
        });
    } catch (error) {
        console.log("Delete Book Error:", error);
        return res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getAllBooks,
    getBooks,
    createNewBook,
    updateBookInfo,
    deleteBook,
};