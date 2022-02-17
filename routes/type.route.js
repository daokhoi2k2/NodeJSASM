const express = require("express");
const router = express.Router();
const controller = require("../controllers/type.controller");



router.get("/:type_name", controller.productByType);


module.exports = router;
