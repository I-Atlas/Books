const express = require("express");
const router = express.Router();

const bookCtrl = require('../controllers/book')

router.get('/', bookCtrl.getAllBooks)
router.get('/newbook', bookCtrl.newBook)

module.exports = router