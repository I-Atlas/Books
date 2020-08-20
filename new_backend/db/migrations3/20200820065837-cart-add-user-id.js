'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cart', 'user_id', {
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
    await queryInterface.removeColumn('cart', 'user_id', {});
  }
};
