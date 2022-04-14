const router = require("express").Router();

const {addBanner, getAllBanner, deleteAllBanner, deleteBannerId} = require('../controller/homepageController')

router.post("/add-banner", addBanner)
router.get("/get-all-banner", getAllBanner)
router.delete("/delete-all-banner", deleteAllBanner)
router.delete("/delete-banner-id", deleteBannerId)


module.exports = router