module.exports = (sequelize, Sequelize) => {
    const CartProduct = sequelize.define(
      'cart',
      {
        cart_id: {
          type: Sequelize.INTEGER,
          notEmpty: true
        },
  
        product_id: {
            type: Sequelize.STRING,
            notEmpty: true
        },
    },
)

CartProduct.associate = models => {}
    return CartProduct
}