const express = require("express")
const router = express.Router()

const controller = require('../controllers/order')
const { isAuth } = require("../middleware/auth")

router.get('/', isAuth, controller.getOrders)
router.post('/create', controller.createOrder)

module.exports = router