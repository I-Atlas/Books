'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      // Order.belongsTo(models.Cart, { foreignKey: 'cart_id' });
      Order.belongsToMany(models.Book, {
        through: "OrderBook",
        // as: "books",
        foreignKey: "order_id",
        otherKey: "book_id",
      });
    }
  };
  Order.init({
    user_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};