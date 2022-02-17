
const lessonModel = require("../models/lessons.model");
const moment = require("moment");
const { LESSON, MAPS, TICKRATES, FAKE_LOADING, TYPES } = require("../constants/api");
const axios = require("axios");

module.exports = {
    index: async (req, res) => {
        // Lấy danh sách tất cả map trong database
        const maps = await axios.get(MAPS);
        const types = await axios.get(TYPES);
        const mapName = req.params.map_name;
        // Lấy thông tin map hiện tại trên thanh URL
        const mapCurrent = maps.data.find((map) => {
            return map.map_name === mapName
        })
        axios.get(LESSON + `/_expand=map/${mapCurrent._id}`)
            .then(res => res.data)
            .then((data) => {
                res.render("client/map", {
                    maps: maps.data,
                    lessons: data,
                    mapCurrent: mapName,
                    types: types.data
                });
            })
            .catch((err) => {
                res.send(err);
            })
        


     
    },
}