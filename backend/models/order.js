"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Order.belongsToMany(models.Book, {
        through: "OrderBook",
        foreignKey: "order_id",
        otherKey: "book_id",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
