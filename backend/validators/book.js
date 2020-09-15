const {
  check
} = require('express-validator');

module.exports = {
  book: [
    check('name', 'Name is missing').exists().isLength({
      min: 1
    }),
    check('price', 'Price must contain numbers').optional().isNumeric(),
  ]
};