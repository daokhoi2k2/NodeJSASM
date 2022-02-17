const tickrate = require("../schema/tickrates.schema");

module.exports = {
	getAllTickrates: () => {
		return tickrate.find()
	},
};
