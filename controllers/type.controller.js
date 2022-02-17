const axios = require("axios");
const { TYPE, KNIFES, MAPS, TYPES } = require("../constants/api");
module.exports = {
    productByType: async (req, res) => {
        const typeName = req.params.type_name;
        const type = await axios.get(TYPE + "/_expand=name/" + typeName);
        const knifes = await axios.get(KNIFES + "/_expand=typeId/" + type.data._id)
        const maps = await axios.get(MAPS);
        const types = await axios.get(TYPES);
        
        res.render("client/product", {
            knifes: knifes.data,
            maps: maps.data,
            types: types.data,
        });
    }
}