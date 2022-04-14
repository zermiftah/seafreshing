const mongoose = require('mongoose')

const categoryModel = new mongoose.Schema({
    iconUrl: {
        type: String
    },


    category: {
        type: String
    }
})

const model = mongoose.model("categoryModel", categoryModel, "dataCategory")

module.exports = model;