const mongoose = require("mongoose");

const tickrateSchema = new mongoose.Schema({
	id: Number,
	value: String,
});

const Tickrate = mongoose.model("tickrates", tickrateSchema);

module.exports = Tickrate;
