const express = require('express')
const app = express()
const dotenv = require('dotenv')
const fs = require('fs')
const {TextDecoder, TextEncoder} = require('util')
dotenv.config({
  path: "./config/.env",
});
const PORT = process.env.PORT || 3001
app.set('port', PORT)
const bodyParser = require('body-parser')
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/database')
var http = require('http').Server(app)
app.use(bodyParser.json({limit : "50mb"}))
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
)
app.use(cors())



connectDB();

app.get("/", function(req, res) {
    res.status(200).json({msg: "connect ok", status: 200})
})

var countryJson = fs.readFileSync(__dirname + "/locale/country.json")
app.get("/api/list/country", function (req, res) {
    res.set("Content-Type", "application/json");
    res.status(200).send(countryJson)
})

var bankJson = fs.readFileSync(__dirname + "/locale/banklist.json")
app.get("/api/list/bank", function (req, res) {
    res.set("Content-Type", "application/json");
    res.status(200).send(bankJson);
})

var regionsJson = fs.readFileSync(__dirname + "/locale/regions.json");
app.get("/api/list/regions", function (req, res) {
  res.set("Content-Type", "application/json");
  var parseJson = JSON.parse(regionsJson);
  res.status(200).json(parseJson)
});

app.use("/api/user", require('./routes/userRoutes'))
app.use("/api/home", require('./routes/homepageRoutes'))
app.use("/api/product", require('./routes/productRoutes'))
app.use("/api/kiosk", require("./routes/kioskRoutes"))
app.use("/api/file-uploader", require('./routes/fileUploadRoutes'))

http.listen(app.get('port'), function () {
    console.log(`Server berjalan pada PORT : ${PORT}`.red.underline.bold);
})


