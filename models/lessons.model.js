const res = require("express/lib/response");
const mongoose = require("mongoose");
const lesson = require("../schema/lessons.schema");

module.exports = {
	getAllLesson: () => {
		return lesson.find();
	},
	getAllLessonExpandMapAndTickRate: () => {
		return lesson.find().populate("mapId").populate("tickrateId");
	},
	getInfoLessonById: (_id) => {
		return lesson.find({_id});
	},
	getLessonsByMap: (_id) => {
		return lesson.find({mapId: _id})
	},
	updateLesson: (_id, data) => {
		return lesson.updateOne({_id}, data).then((res) => {
			return res;
		})
	},
	deleteLesson: (_id) => {
		return lesson.deleteOne({ _id }).then((data) => {
			return data;
		});
	},
	addLesson: ({ video_url, mapId, tickrateId, poster, position, video_duration, isShow }) => {
		const result = lesson.create({
			video_url,
			mapId,
			tickrateId,
			poster,
			position,
			video_duration,
			isShow,
		})
		return result;
	},
};
