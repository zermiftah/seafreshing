const mongoose = require('mongoose')

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URL)

    console.log('database terhubung: ' + connect.connection.host.cyan.bold);
}

module.exports = connectDB