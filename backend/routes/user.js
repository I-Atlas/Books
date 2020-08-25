const express = require("express")
const router = express.Router()

const controller = require('../controllers/user')

router.get('/', controller.getAllUsers)
router.put('/update', controller.updateUserInfo)
router.delete('/delete', controller.deleteUser)

module.exports = router