const express = require("express")
const router = express.Router()

const validators = require('../validators')
const controller = require('../controllers/book')
const { upload } = require("../middleware/multer");

router.get('/', controller.getAllBooks)
router.get('/gb', controller.getBooks)
router.post('/create', validators('book.book'), controller.createNewBook)
router.put('/update', upload.single("image"), validators('book.book'), controller.updateBookInfo)
router.delete('/delete',  controller.deleteBook)

module.exports = router