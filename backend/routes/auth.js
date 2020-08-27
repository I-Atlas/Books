const express = require("express")
const router = express.Router()

const validators = require('../validators')
const controller = require('../controllers/auth')

router.post('/login', validators('auth.login'), controller.login)
router.post('/register', validators('auth.register'), controller.register)

module.exports = router