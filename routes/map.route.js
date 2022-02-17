const express = require("express");
const router = express.Router();
const controller = require("../controllers/map.controller");


router.get("/:map_name", controller.index);


module.exports = router;
