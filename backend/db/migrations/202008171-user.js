'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      username: {
        type: Sequelize.STRING,
        notEmpty: true
      },

      email: {
        type: Sequelize.STRING,
        notEmpty: true,
        validate: {
            isEmail: true
        }
      },

      password: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('user')
  }
}