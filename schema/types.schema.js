const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
	id: Number,
	name: String,
});

const Type = mongoose.model("types", typeSchema);

module.exports = Type;
