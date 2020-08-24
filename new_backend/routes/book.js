const express = require("express");
const router = express.Router();

const controller = require('../controllers/book')

router.get('/', controller.getAllBooks)
router.post('/new', controller.createNewBook)

module.exports = router