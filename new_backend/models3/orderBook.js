'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderBook.init({
    order_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderBook',
  });
  return OrderBook;
};