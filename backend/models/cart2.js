const { Model } = require('sequelize')
const User = require('./asdasf')

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
      static associate(models) {
        // Cart.belongsTo(models.User, {foreignKey: 'id', as: 'Cart'})
      }
    }

    Cart.init({
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
  
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
      }
    }, {
        sequelize,
        modelName: 'cart'
    })
  return Cart
}