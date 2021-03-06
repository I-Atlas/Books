const db = require("../models");
const { Op } = db.Sequelize;

const DEFAULT_SIZE = 9;

const getPagination = (page, size) => {
  const limit = size ? +size : DEFAULT_SIZE;
  const offset = page ? page * limit : 0;

  return {
    limit,
    offset,
  };
};

const getPagingData = (data, page, limit) => {
  const { count: totalBooks, rows: books } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalBooks / limit);

  return {
    totalBooks,
    books,
    totalPages,
    currentPage,
  };
};

async function getBooks(req, res, next) {
  const {
    name,
    category,
    page,
    size,
    order_type = "ASC",
    order_item = "name",
  } = req.query;

  try {
    const filterOptions = {};
    const { limit, offset } = getPagination(page, size);

    if (name) {
      filterOptions.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (category) {
      filterOptions.category = {
        category: category,
      };
    }

    const dbQuery = {
      where: filterOptions,
      offset: +offset,
      order: [[order_item, order_type]],
    };

    if (size !== 0) {
      dbQuery.limit = limit;
    }

    const data = await db.Book.findAndCountAll(dbQuery);
    const response = getPagingData(data, page, limit);
    return res.send(response);

  } catch (error) {
    console.log("Get Books Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
}

const getBookPage = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await db.Book.findOne({
      id,
    });

    return res.status(201).json(book);
  } catch (error) {
    console.log("Get Book Page Error:", error);
    return res.status(500).json({
      error: error.message,
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
    rating,
    category,
  } = req.body;

  const bookPayload = {
    name,
    description,
    price,
    example,
    author,
    rating,
    category,
  };

  if (req.file) {
    bookPayload.image = req.file.filename;
  }

  try {
    await db.Book.create(bookPayload);

    return res.status(201).json({
      message: "Book successfully created",
    });
  } catch (error) {
    console.log("Create New Book Error:", error);
    return res.status(500).json({
      error: error.message,
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
    await db.Book.update(
      {
        name,
        description,
        price,
        example,
        author,
        image,
        rating,
        category,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({
      message: "Book information successfully updated",
    });
  } catch (error) {
    console.log("Update Book Information Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.query;

  try {
    await db.Book.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Book successfully deleted",
    });
  } catch (error) {
    console.log("Delete Book Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getBookPage,
  getBooks,
  createNewBook,
  updateBookInfo,
  deleteBook,
};
