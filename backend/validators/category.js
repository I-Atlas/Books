const { check } = require("express-validator");

module.exports = {
  category: [
    check("name", "Name is missing").exists().isLength({
      min: 1,
    }),
  ],
};
