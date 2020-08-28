const { check } = require('express-validator');

module.exports = {
  update: [
    check('password', 'Invalid password').exists(),
    check('email', 'Invalid email').exists()
  ]
};