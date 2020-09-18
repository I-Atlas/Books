const express = require("express");
const router = express.Router();

const controller = require("../controllers/order");
const { isAuth } = require("../middleware/auth");

router.use(isAuth);
router.get("/", /* isAdminOrOwner */ controller.getOrders);
router.post("/create", controller.createOrder);

module.exports = router;
