const router = require('express').Router()
const {addProduct, getAllProduct, getProduct, getKioskProduct, deleteProduct, setProductPrice, setProductQuantity} = require('../controller/productController')
const protect = require("../controller/verifyToken");

router.post("/add-product", protect, addProduct)
router.get("/get-all-product", getAllProduct)
router.get("/get-product/:id", getProduct)
router.get("/get-kiosk-product/:kiosk", protect, getKioskProduct)
router.delete("/delete-product/:id", protect, deleteProduct)
router.patch("/update-product-price", protect, setProductPrice)
router.patch("/update-product-quantity", protect, setProductQuantity)
module.exports = router