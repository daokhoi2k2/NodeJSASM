const axios = require("axios");

const API_URI = `${process.env.HOST}`;
module.exports = {
    LESSONS: API_URI + "api/lessons",
    LESSON: API_URI + "api/lesson",
    MAPS: API_URI + "api/maps",
    TICKRATES: API_URI + "api/tickrates",
    FAKE_LOADING: process.env.FAKE_LOADING == "true" ? true : false,
    TYPES: API_URI + "api/types",
    TYPE: API_URI + "api/type",
    KNIFES: API_URI + "api/knifes",
    getApiSteam: (market_hash_name) => {
        return axios.get("https://steamcommunity.com/market/priceoverview/?appid=730&currency=15&market_hash_name=" + encodeURI(market_hash_name));
    }
}