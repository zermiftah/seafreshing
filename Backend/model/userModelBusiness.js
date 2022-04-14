const mongoose = require("mongoose");

const wishlist = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: String,
  },
});

const freezer = new mongoose.Schema({
  product: {
    type: String,
  },
});

const userHelper = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobilenumber: {
        type: String
    },
    userType: {
        type: Number
    },
    password: {
        type: String
    },
    wishlist: [wishlist],
    freezer: [freezer]
})

const model = new mongoose.Schema({
  id: {
    type: String,
  },
  busname: {
    type: String,
  },
  busaddress: {
    type: String,
  },
  buscity: {
    type: String,
  },
  buszipcode: {
    type: String,
  },
  buscountry: {
    type: String,
  },
  busemail: {
    type: String,
  },
  busmobilenumber: {
    type: String,
  },
  busrefcode: {
    type: String,
  },
  buspassword: {
    type: String,
  },
  isVerifiedEmail: {
    type: Boolean,
  },
  isVerifiedPhone: {
    type: Boolean,
  },
  profile: {
    type: String,
  },
  banner: {
    type: String,
  },
  accounttype: {
    type: Number,
  },
  bankname: {
      type: String
  },
  accountnumber: {
      type: String
  },
  branch: {
      type: String
  },
  searchbus: {
      type: String
  },
  undername: {
      type: String
  },
  npwp: {
      type: String
  },
  userType: {
      type: Number
  },
  myRefCode: {
    type: String
  },
  wishlist: [wishlist],
  freezer: [freezer],
  userHelper: [userHelper]
});

const userBusiness = mongoose.model(
  "businessAccount",
  model,
  "dataBusinessAccount"
);

module.exports = userBusiness;
