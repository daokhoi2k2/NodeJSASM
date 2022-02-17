const res = require("express/lib/response");
const mongoose = require("mongoose");
const knife = require("../schema/knifes.schema");

module.exports = {
	getAllKnifes: () => {
		return knife.find();
	},
	insertKnife: (data) => {
		return knife.create(data).then((res) => {
			return res;
		})
	},
	getHotKnifes: () => {
		return knife.find().sort({ volume: -1}).limit(3)
	},
	getNewKnifes: () => {
		return knife.find().sort({ createdAt: -1}).limit(3)
	},
	getMostViewKnifes: () => {
		return knife.find().sort({ view: -1}).limit(3)
	},
	getKnifeByTypeId: (id) => {
		return knife.find({typeId: id})
	},
	getKnifeByName: (market_hash_name) => {
		return knife.find({market_hash_name}).populate("typeId")
	}
};
