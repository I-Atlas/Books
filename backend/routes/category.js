const express = require("express");
const router = express.Router();

const validators = require("../validators");
const controller = require("../controllers/category");

router.get("/", controller.getAllCategories);
router.post(
  "/create",
  validators("category.category"),
  controller.createCategory
);
router.delete("/delete", controller.deleteCategory);

module.exports = router;
