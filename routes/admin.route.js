const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const controller = require("../controllers/admin.controller");
var jsonParser = bodyParser.json();


router.get("/", controller.index);

router.get("/tables", controller.tables);

router
    .get("/add-lesson", controller.addLesson)
    .post("/add-lesson", controller.addLessonPost)

router
    .get("/update-lesson/:_id", controller.updateLesson)
    .post("/update-lesson/:_id", controller.updateLessonPost)

router
    .get("/add-product", controller.addProduct)
    .post("/add-product", jsonParser, controller.addProductPost)

module.exports = router;
