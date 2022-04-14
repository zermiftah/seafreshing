const mongoose = require('mongoose')


const kioskModel = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    domain: {
        type: String
    },
    search: {
        type: String
    },
    fullAddress: {
        type: String
    },
    addressDetails: {
        type: String
    },
    profile: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
})

const model = mongoose.model("kioskModel", kioskModel, "dataKiosk")

module.exports = model