'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CartProduct.init({
    cart_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartProduct',
  });
  return CartProduct;
};