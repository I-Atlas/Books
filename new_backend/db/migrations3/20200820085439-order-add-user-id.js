'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('order', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
          model: "Users",
          key: "id"
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('order', 'user_id', {});
  }
};