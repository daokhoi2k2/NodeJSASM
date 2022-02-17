const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/api.controller.js");
var jsonParser = bodyParser.json()

router.get("/", controller.index);

// Lesson
router
    .get("/lessons", controller.lessons)
    .get("/lessons/:_id", controller.infoLesson)
    .get("/lesson/_expand=map/:_id", controller.lessonsByMap)
    .post("/lessons", jsonParser, controller.addLesson)
    .patch("/lessons/:_id", jsonParser, controller.patchLesson)
    .delete("/lessons/:id", controller.deleteLesson)
// Map
router 
    .get("/maps", controller.maps)
    .get("/maps/info/:id", controller.getInfoMapById)

// Tickrate
router
    .get("/tickrates", controller.tickrates)

// Type
router
    .get("/types", controller.types)
    .get("/type/_expand=name/:name", controller.getTypeByName)

// Knifes
router
    .get("/knifes", controller.knifes)
    .get("/knifes/hot/", controller.getHotKnifes)
    .get("/knifes/new/", controller.getNewKnifes)
    .get("/knifes/most-view/", controller.getMostViewKnifes)
    .get("/knifes/_expand=typeId/:type_id", controller.getKnifeByTypeId)
    .get("/knifes/name/:market_hash_name", controller.getKnifeByName)
    .post("/knifes", controller.addKnife)


module.exports = router;
