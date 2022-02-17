const map = require("../schema/maps.schema");

module.exports = {
	getAllMap: () => {
		return map.find();
	},
	getInfoMapById: (_id) => {
		return map.find({_id});
	}
};
