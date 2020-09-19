const express = require("express");
const router = express.Router();

const validators = require("../validators");
const controller = require("../controllers/author");

router.get("/", controller.getAllAuthors);
router.post("/create", validators("author.author"), controller.createAuthor);
router.delete("/delete", controller.deleteAuthor);

module.exports = router;
