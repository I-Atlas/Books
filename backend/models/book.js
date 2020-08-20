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
      // define association here
    }
  };
  Book.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    example: DataTypes.TEXT,
    author: DataTypes.STRING,
    image: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};