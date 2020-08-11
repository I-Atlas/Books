const utils = require('../../utils');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      firstName: {
        type: Sequelize.STRING,
        notEmpty: true
      },

      lastName: {
        type: Sequelize.STRING,
        notEmpty: true
      },

      login: {
        type: Sequelize.TEXT,
        allowNull: false,
        notEmpty: true,
        unique: true
      },
    },
    {
      getterMethods: {
        username() {
          if (this.firstName && this.lastName) {
            return `${this.firstName} ${this.lastName}`;
          }
          return this.login;
        }
      }
    }
  );



  User.beforeCreate(user => {
    if (user.isNewRecord && user.password) {
      user.password = utils.hash.generate(user.password);
    }
    return user;
  });

  User.associate = models => {}
  

  return User;
};