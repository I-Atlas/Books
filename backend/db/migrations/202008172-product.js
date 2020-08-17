'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
          type: Sequelize.STRING,
          notEmpty: true
      },

      description: {
          type: Sequelize.TEXT
      },

      price: {
          type: Sequelize.INTEGER,
          notEmpty: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date()
      },
      
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date()
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product')
  }
}