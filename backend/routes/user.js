const express = require("express")
const router = express.Router()

const controller = require('../controllers/user')
const { verifyToken } = require("../middleware/auth")

router.get('/', [verifyToken], controller.getAllUsers)
router.put('/update', controller.updateUserInfo)
router.delete('/delete', controller.deleteUser)

module.exports = router