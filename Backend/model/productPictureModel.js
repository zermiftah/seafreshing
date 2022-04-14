const mongoose = require('mongoose')

const pictureModel = new mongoose.Schema({
  fileName: {
    type: String
  },
  filePath: {
    type: String
  },
  fileType: {
    type: String
  },
  fileSize: {
    type: String
  },
});

const model = mongoose.model("productPictureModel", pictureModel, "dataProductPictureUrl")

module.exports = model