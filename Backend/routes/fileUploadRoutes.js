const express = require('express')
const router = express.Router()

const {upload} = require('../helper/fileHelper')
const protect = require("../controller/verifyToken");


const {productPictureUpload} = require('../controller/fileUploadController')

router.post('/upload-product-picture', protect, upload.single("productPicture"), productPictureUpload)
router.post('/upload-profile-picture', protect, upload.single("profilePicture"), productPictureUpload)
router.post('/upload-banner-picture', protect, upload.single("bannerPicture"), productPictureUpload)

module.exports = router