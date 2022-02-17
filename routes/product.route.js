const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");


router.get("/", controller.index);

router.get("/:market_hash_name", controller.productDetail);


module.exports = router;
