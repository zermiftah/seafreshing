const router = require('express').Router()
const {checkName, checkDomain, getKiosk,openKiosk} = require('../controller/kioskController')
const protect = require("../controller/verifyToken");



router.get('/check-name/:name', checkName)
router.get('/check-domain/:domain', checkDomain)
router.post('/open-kiosk',protect, openKiosk)
router.get('/get-kiosk/:id', getKiosk)



module.exports = router