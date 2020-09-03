const {
  check
} = require('express-validator');

module.exports = {
  update: [
    check('username', 'Username is missing').exists(),
    check('password', 'Invalid password').exists(),
  ]
};