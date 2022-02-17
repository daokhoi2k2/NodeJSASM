const type = require("../schema/types.schema");

module.exports = {
	getAllType: () => {
		return type.find()
	},
	getTypeByName: (name) => {
		return type.findOne({name});
	}
};
