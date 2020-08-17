module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      'user',
      {
        id: {
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

        first_name: {
            type: Sequelize.STRING
        },

        last_name: {
            type: Sequelize.STRING
        },
        
        avatar: {
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

User.associate = models => {}
    return User
}