const express = require("express")
const router = express.Router()

const controller = require('../controllers/user')
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../middleware/auth")

router.get('/', [verifyToken], controller.getAllUsers)
router.patch('/:id', upload.single("avatar"), controller.updateUserInfo)
router.delete('/:id', controller.deleteUser)

module.exports = router