"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderBook extends Model {
    static associate(models) {
    }
  }
  OrderBook.init(
    {
      order_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "OrderBook",
    }
  );
  return OrderBook;
};
