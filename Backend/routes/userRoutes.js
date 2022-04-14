const router = require('express').Router()
const {
  registerindividual,
  setKiosk,
  setProfilePicture,
  setFullname,
  setBannerPicture,
  deleteWishlist,
  deleteFreezer,
  login,
  addWishlist,
  getAllFreezer,
  getAllWishlist,
  addFreezer,
  getUserInfo,
  changeStateVerifyEmailBusiness,
  registerBusiness,
  changeStateVerifyEmailIndividual,
  sendVerificationCode,
  setContainerCheckBox,
  verifyCode,
  setContainerCheckboxSingle,
  setItemCheckbox,
  onPlusMinClick,
  deleteContainerFreezer,
  setFreezerNote,
  setQuantityUnit,
  setWholesale,
  getTranasction,
  createPayment,
  saveAddress,
  getAddress,
  loginEmail
} = require("../controller/userController");
const protect = require('../controller/verifyToken')

router.post('/register-individual', registerindividual);
router.post('/send-verify-email', sendVerificationCode)
router.post('/verify-email-code', verifyCode)
router.post('/register-business', registerBusiness)
router.patch('/state-verify-email', protect, changeStateVerifyEmailIndividual)
router.patch("/state-verify-email-business", protect, changeStateVerifyEmailBusiness);
// router.post('/login', login)
router.post('/login', loginEmail)
router.get("/get-user/:accounttype/:id", protect, getUserInfo);
router.get("/get-user/:id", protect, getUserInfo);
router.post("/set-kiosk", protect,setKiosk)
router.patch("/add-wishlist",protect, addWishlist)
router.patch("/add-freezer",protect, addFreezer)
router.get('/get-wishlist/:accounttype/:id',protect, getAllWishlist)
router.get("/get-freezer/:userid",protect, getAllFreezer);
router.delete('/delete-wishlist', protect,deleteWishlist)
router.delete('/delete-freezer', protect,deleteFreezer)
router.patch('/set-profile-picture', protect, setProfilePicture)
router.patch('/set-banner-picture', protect, setBannerPicture)
router.patch('/set-fullname', protect, setFullname)
router.patch('/set-container-checkbox', protect, setContainerCheckBox)
router.patch('/set-container-checkbox-single', protect, setContainerCheckboxSingle)
router.patch('/set-item-checkbox', protect, setItemCheckbox)
router.delete('/delete-container-freezer', protect, deleteContainerFreezer)
router.patch('/set-wholesale', protect, setWholesale)
router.patch('/set-freezer-note', protect, setFreezerNote)
router.patch('/set-quantity-unit',protect, setQuantityUnit)
router.patch('/set-plus-min-click', protect, onPlusMinClick)
router.patch('/create-payment', protect, createPayment)
router.get('/get-transaction/:payId',protect, getTranasction)
router.patch('/save-address', protect, saveAddress)
router.get('/get-address/:userId',protect, getAddress)
module.exports = router