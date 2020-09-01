const express = require("express")
const router = express.Router()

const controller = require('../controllers/user')
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../middleware/auth")

router.get('/', [verifyToken], controller.getAllUsers)
router.put('/update', upload.single("avatar"), controller.updateUserInfo)
router.delete('/delete', controller.deleteUser)

module.exports = router