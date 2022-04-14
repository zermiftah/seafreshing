const mongoose = require('mongoose')

const verifySchema = new mongoose.Schema({
    requestId: {
        type: String
    },
    email: {
        type: String
    },
    id: {
        type: String
    },
    code: {
        type: Number
    }
})

const model = mongoose.model("verification", verifySchema, "dataVerify")
module.exports = model