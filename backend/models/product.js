// const utils = require('../../utils');

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define(
      'product',
      {
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

        example: {
            type: Sequelize.TEXT
        },

        author: {
            type: Sequelize.STRING
        },

        image: {
            type: Sequelize.STRING
        },

        rating: {
            type: Sequelize.DECIMAL,
            defaultValue: 4.9
        },

        category: {
            type: Sequelize.STRING
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
    },
)

Product.associate = models => {}
    return Product
}