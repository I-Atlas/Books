const { check } = require("express-validator");

module.exports = {
  author: [
    check("name", "Name is missing").exists().isLength({
      min: 1,
    }),
  ],
};
