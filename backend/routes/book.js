const express = require("express")
const router = express.Router()

const validators = require('../validators')
const controller = require('../controllers/book')

router.get('/', controller.getAllBooks)
router.post('/create', validators('book.create'), controller.createNewBook)
router.put('/update', validators('book.update'), controller.updateBookInfo)
router.delete('/delete',  controller.deleteBook)

module.exports = router