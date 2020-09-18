const db = require("../models");
const Sequelize = require("sequelize");

const createAuthor = async (req, res) => {
  const { name } = req.body;
  try {
    const author = await db.Author.create({ name });

    return res.status(200).json(author);
  } catch (error) {
    console.log("Create Author Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Author.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      message: "Author successfully deleted",
    });
  } catch (error) {
    console.log("Delete Author Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const getAuthorsData = (data) => {
      const { count: total, rows: authors } = data;

      return {
        total,
        authors,
      };
    };
    const data = await db.Author.findAndCountAll({});
    const authorResponse = getAuthorsData(data);

    return res.status(200).json(authorResponse);
  } catch (error) {
    console.log("Get All Authors Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const searchAuthors = async (req, res) => {
  try {
    const data = await db.Author.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${req.query.name}%`,
        },
      },
    });

    return res.status(200).json({
      authors: data,
    });
  } catch (error) {
    console.log("Search Authors Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  searchAuthors,
};
