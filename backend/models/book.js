"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Author, { foreignKey: "author_id" });
      Book.belongsTo(models.Category, { foreignKey: "category_id" });
      Book.belongsToMany(models.Order, {
        through: "OrderBook",
        foreignKey: "book_id",
        foreignKey: "price",
        otherKey: "order_id",
      });
    }
  }
  Book.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      example: DataTypes.TEXT,
      author_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      author: DataTypes.STRING,
      image: DataTypes.STRING,
      rating: DataTypes.DECIMAL,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
