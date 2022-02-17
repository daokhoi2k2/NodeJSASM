const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema({
	id: Number,
	map_name: String,
});

const Map = mongoose.model("maps", mapSchema);

module.exports = Map;
