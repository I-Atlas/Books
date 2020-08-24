const express = require("express");
const router = express.Router();

const controller = require('../controllers/user')

router.get('/', controller.getAllUsers)
router.post('/update', controller.updateUserInfo)
router.post('/delete', controller.deleteUser)

module.exports = router