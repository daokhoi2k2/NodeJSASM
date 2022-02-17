const lessonModel = require("../models/lessons.model");
const typesModel = require("../models/types.model");
const mapsModel = require("../models/maps.model");
const tickratesModel = require("../models/tickrates.model");
const knifesModel = require("../models/knifes.model");
module.exports = {
	index: (req, res) => {
		res.render("admin/index");
	},
	lessons: async (req, res) => {
		const lessons = await lessonModel.getAllLessonExpandMapAndTickRate();
		res.send(lessons);
	},
	lessonsByMap: async (req, res) => {
		const _id = req.params._id;
		const lessons = await lessonModel.getLessonsByMap(_id);
		res.send(lessons)
	},
	infoLesson: async (req, res) => {
		const _id = req.params._id;
		const lessons = await lessonModel.getInfoLessonById(_id);
		res.send(lessons);
	},
	addLesson: async (req, res) => {
		const video_url = req.body.video_url;
		const mapId = req.body.mapId;
		const tickrateId = req.body.tickrateId;
		const poster = req.body.poster;
		const position = req.body.position;
		const video_duration = req.body.video_duration;
		const isShow = req.body.isShow;

		const result = await lessonModel.addLesson({
			video_url,
			mapId,
			tickrateId,
			poster,
			position,
			video_duration,
			isShow,
		});
		// Trả về document vừa được thêm
		res.send(result);
	},
	patchLesson: async (req, res) => {
		const _id = req.params._id;

		const response = await lessonModel.updateLesson(_id, req.body)
 		res.send(response);
	},
	deleteLesson: async (req, res) => {
		const id = req.params.id;
		const result = await lessonModel.deleteLesson(id);

		if (result.deletedCount > 0) {
			res.send({ success: true });
		} else {
			res.send({ success: false });
		}
	},
	maps: async (req, res) => {
		const data = await mapsModel.getAllMap();
		res.send(data);
	},
	getInfoMapById: async (req, res) => {
		const id = req.params.id;
		const data = await mapsModel.getInfoMapById(id);
		res.send(data);
	},
	tickrates: async (req, res) => {
		const data = await tickratesModel.getAllTickrates();
		res.send(data);
	},
	types: async (req, res) => {
		const data = await typesModel.getAllType();
		res.send(data);
	},
	getTypeByName: async (req, res) => {
		const name = req.params.name;
		const data = await typesModel.getTypeByName(name);

		res.send(data);
	},
	knifes: async (req, res) => {
		const data = await knifesModel.getAllKnifes();
		res.send(data)
	},
	getKnifeByName: async (req, res) => {
		const market_hash_name = req.params.market_hash_name;

		const data = await knifesModel.getKnifeByName(market_hash_name);
		res.send(data)
	},
	getHotKnifes: async (req, res) => {
		const data = await knifesModel.getHotKnifes();
		res.send(data)
	},
	getNewKnifes: async (req, res) => {
		const data = await knifesModel.getNewKnifes();
		res.send(data)
	},
	getMostViewKnifes: async (req, res) => {
		const data = await knifesModel.getMostViewKnifes();
		res.send(data)
	},
	
	getKnifeByTypeId: async (req, res) => {
		const typeId = req.params.type_id;
		
		const data = await knifesModel.getKnifeByTypeId(typeId);
		res.send(data)
	},
	addKnife: async (req, res) => {
		const result = await knifesModel.insertKnife(req.body);
		res.send(result);
	} 
};
