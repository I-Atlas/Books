'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cart', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
          model: "order",
          key: "id"
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cart', 'order_id', {});
  }
};
