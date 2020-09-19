const express = require("express");
const router = express.Router();

const validators = require("../validators");
const controller = require("../controllers/auth");
const { isAuth, refreshToken } = require("../middleware/auth");

router.post("/login", validators("auth.login"), controller.login);
router.post("/register", validators("auth.register"), controller.register);
router.post("/refresh", refreshToken);
router.get("/profile/:id", isAuth, controller.profile);

module.exports = router;
