const asyncHandler = require('express-async-handler')
const productPictureModel = require('../model/productPictureModel')
const AWS = require('aws-sdk')
const fs = require('fs')

const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
});



const productPictureUpload = asyncHandler(async (req, res, next) => {
    let path = req.file.path
    var url;

     var params = {
       ACL: "public-read",
       Bucket: process.env.BUCKET_NAME,
       Body: fs.createReadStream(path),
       Key: `${
         new Date().toISOString().replace(/:/g, "-") +
         "-" +
         req.file.originalname
       }`,
     };

     s3.upload(params, async(err, data) => {
         if(err) {
             return res.status(400).json({
                 msg: err.message
             })
         }

         if(data) {
             fs.unlinkSync(path);
             url = data.Location

             const file = new productPictureModel({
                 fileName: req.file.originalname,
                 filePath: url,
                 fileType: req.file.mimetype,
                 fileSize: fileSizeFormatter(req.file.size, 4)
             })
             await file.save();
             res.status(200).json(file)
         }
     })
})

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index]
}



module.exports = {productPictureUpload}

