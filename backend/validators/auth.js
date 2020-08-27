const { check } = require('express-validator');

module.exports = {
  login: [
    check('password', "Invalid password").exists(),
    check('email', 'Invalid email').exists().normalizeEmail().isEmail()
  ],
  register: [
    check('username', 'Username is missing').exists(),
    check('email', 'Email is missing').exists(),
    check('email', 'Email has wrong format').isEmail(),
    check('password', 'Password is missing').exists(),
    check('password', 'Password must contain at least 6 characters').isLength({ min: 6 }),
  ],
  refreshToken: [check('refreshToken', 'refreshToken is missing').exists()]
};