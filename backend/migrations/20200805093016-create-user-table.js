'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * 
     * 
     */
     await queryInterface.createTable('users', {
       id: Sequelize.INTEGER,
       name: Sequelize.STRING,
       createdAt: Sequelize.DATE,
       updatedAt: Sequelize.DATE,
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    
     await queryInterface.dropTable('users');
  }
};
