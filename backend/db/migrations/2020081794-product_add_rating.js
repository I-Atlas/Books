'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('product', 'rating', {
      type: Sequelize.DECIMAL,
      defaultValue: 4.9
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('product', 'rating', {})
  }
}