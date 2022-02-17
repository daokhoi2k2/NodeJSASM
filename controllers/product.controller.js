
const lessonModel = require("../models/lessons.model");
const moment = require("moment");
const { LESSON, MAPS, KNIFES, TYPES } = require("../constants/api");
const axios = require("axios");

module.exports = {
    index: async (req, res) => {
        const knifes = await axios.get(KNIFES);
        const maps = await axios.get(MAPS);
        const types = await axios.get(TYPES);
        
        res.render("client/product", {
            knifes: knifes.data,
            maps: maps.data,
            types: types.data
        });
    },
    productDetail: async (req, res) => {
        const market_hash_name = req.params.market_hash_name;
        const maps = await axios.get(MAPS);
        const types = await axios.get(TYPES);
        // encodeURI chuyển tên sản phẩm thành dạng URL tránh lỗi URL.
        const result = await axios.get(KNIFES + "/name/" + encodeURI(market_hash_name))

        res.render("client/productDetail", {
            knife: result.data[0],
            maps: maps.data,
            types: types.data
        });
    }
}