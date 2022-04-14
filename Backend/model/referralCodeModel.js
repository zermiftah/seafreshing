const mongoose = require('mongoose')




const referralModel = new mongoose.Schema({
    userId: {
        type: String
    },

    referralCode: {
        type: String
    },

    usage: {
        type: Number
    },

    discount: {
        type: String
    }
})

const model = mongoose.model("referralModel", referralModel, "dataReferral");

module.exports = model