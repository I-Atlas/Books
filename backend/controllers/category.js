const db = require("../models");

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await db.Category.create({ name });

    return res.status(200).json(category);
  } catch (error) {
    console.log("Create Category Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Category.destroy({ where: { id } });
    return res.status(200).json({
      message: "Category successfully deleted",
    });
  } catch (error) {
    console.log("Delete Category Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const getCategoriesData = data => {
      const { count: total, rows: categories } = data;

      return {
        total,
        categories
      }
    }
    const data = await db.Category.findAndCountAll({});
    const categoryResponse = getCategoriesData(data)

    return res.status(200).json(categoryResponse);
  } catch (error) {
    console.log("Get All Categories Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  getAllCategories,
};
