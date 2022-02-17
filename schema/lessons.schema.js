const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
	{
		video_url: String,
		video_duration: Number,
		tickrateId: {
			type: String,
			ref: "tickrates",
		},
		position: String,
		poster: String,
		isShow: Boolean,
		mapId: {
			type: String,
			ref: "maps",
		},
		create_timeStamp: String
	},
	{ timestamps: true }
);

const Lesson = mongoose.model("lessons", lessonSchema, "lessons");

module.exports = Lesson;
