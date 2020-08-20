'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'first_name', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Users', 'last_name', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Users', 'avatar_id', {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'first_name', {});
    await queryInterface.removeColumn('Users', 'last_name', {});
    await queryInterface.removeColumn('Users', 'avatar', {});
    await queryInterface.removeColumn('Users', 'avatar_id', {});
  }
};
