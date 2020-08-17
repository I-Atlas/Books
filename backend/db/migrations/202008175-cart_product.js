'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart_product', {
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cart_product')
  }
}
