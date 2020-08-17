module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define(
      'cart',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
  
        user_id: {
            type: Sequelize.STRING,
            notEmpty: true
        },
    },
)

Cart.associate = models => {}
    return Cart
}