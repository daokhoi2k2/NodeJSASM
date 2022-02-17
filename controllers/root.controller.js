
const lessonModel = require("../models/lessons.model");
const moment = require("moment");
const { MAPS, KNIFES, TYPES } = require("../constants/api");
const axios = require("axios");

module.exports = {
    index: async (req, res) => {
        const maps = await axios.get(MAPS);
        const types = await axios.get(TYPES)
        const hotKnifes = await axios.get(KNIFES + "/hot");
        const newKnifes = await axios.get(KNIFES + "/new");
        const mostViewKnifes = await axios.get(KNIFES + "/most-view")

        res.render("client/index", {
            maps: maps.data,
            types: types.data,
            hotKnifes: hotKnifes.data,
            newKnifes: newKnifes.data,
            mostViewKnifes: mostViewKnifes.data
        });
    },
}