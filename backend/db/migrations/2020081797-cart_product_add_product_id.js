'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cart_product', 'product_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
          model: "product",
          key: "id"
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cart_product', 'product_id', {})
  }
}