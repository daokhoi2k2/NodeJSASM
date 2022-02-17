const mongoose = require("mongoose");

const knifeSchema = new mongoose.Schema(
	{
		market_hash_name: String,
		img_url: String,
		typeId: {
			type: String,
			ref: "types",
		},
        description: String,
		isShow: Boolean,
		lowest_price: String,
		volume: {
			type: Number,
			default: 0
		},
		view: {
			type: Number,
			default: 0
		},
	},
	{ timestamps: true }
);

const Knife = mongoose.model("knifes", knifeSchema, "knifes");

module.exports = Knife;
