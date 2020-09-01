'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsToMany(models.Order, {
        through: "OrderBook",
        foreignKey: "book_id",
        foreignKey: "price",
        otherKey: "order_id",
      });
    }
  };
  Book.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    example: DataTypes.TEXT,
    author: DataTypes.STRING,
    image: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book'
  });
  return Book;
};