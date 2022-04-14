const mongoose = require('mongoose')

const bannerModel = new mongoose.Schema({
    imgUrl: {
        type: String
    },

    id: {
        type: String
    }
})

const model = mongoose.model("bannerModel", bannerModel, "dataBanner")
module.exports = model