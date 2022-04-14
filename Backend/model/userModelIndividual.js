const mongoose = require('mongoose')

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

  priceUnit: {
    type: String,
  },

  image: {
    type: String,
  },
  rating: {
    type: String,
  },
  isWholesale: {
    type: Boolean,
  },
  minimumOrder: {
    total: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  kioskId: {
    type: String,
  },
  kioskName: {
    type: String,
  },
});


const freezerProduct = new mongoose.Schema({
  id: {
    type: String,
  },
  clearPrice: {
    type: Number,
  },
  name: {
    type: String,
  },
  isChecked: {
    type: Boolean,
  },

  isWholesalePrice: {
    type: Boolean,
  },

  productQuantity: {
    type: Number,
  },

  productQuantityUnit: {
    type: String,
  },

  quantityWholesaleReal: {
    type: Number,
  },

  unitWholesale: {
    type: String,
  },

  quantityWholesale: {
    type: Number,
  },

  price: {
    type: String,
  },

  priceUnit: {
    type: String,
  },

  minimumOrder: {
    total: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },

  quantityUnit: {
    total: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },

  totalPrice: {
    type: Number,
  },

  image: {
    type: String,
  },

  priceWholesale: {
    type: Number,
  },

  isWholesale: {
    type: Boolean,
  },

  kioskId: {
    type: String,
  },

  note: {
    type: String,
  },
});


const freezer = new mongoose.Schema({
  id: {
    type: String,
  },

  kioskName: {
    type: String,
  },
  kioskCity: {
    type: String,
  },
  isCheckAll: {
    type: Boolean,
  },
  courier: {
    type: Number
  },
  estDelivery: {
    type: String

  },
  deliveryCost: {
    type: Number
  },
  product: [freezerProduct],
});


const transaction = new mongoose.Schema({
  payId: {
    type: String
  },
  totalPayment: {
    type: Number
  },
  paymentMethod: {
    type: Number
  },
  paymentMethodDis:  {
    type: String
  },
  paymentLogo: {
    type: String
  },
  paymentStatus: {
    type: Number
  },
  accountName: {
    type: String
  },
  accountNumber: {
    type: String
  },
  createTimestamp: {
    type: String
  },
  product : [freezer]

})



const address = new mongoose.Schema({
  city: {
    type: String,
  },
  zipCode: {
    type: Number,
  },
  latlng: {
    type: String
  },
  district: {
    type: String,
  },
  subdistrict: {
    type: String,
  },
  province: {
    type: String,
  },
  isUsed: {
    type: Boolean,
  },
  label: {
    type: String,
  },
  fullAddress: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  receivedName: {
    type: String,
  },
  isPin: {
    type: Boolean,
  }
})




const model = new mongoose.Schema({
    id: {
        type: String
    },
    fullname: {
        type: String
    },
    
    email: {
        type: String
    },
    mobilenumber: {
        type: String
    },
    refcode: {
        type: String
    },
    password: {
        type: String
    },
    isVerifiedEmail: {
        type: Boolean
    },
    isVerifiedPhone: {
        type: Boolean
    },
    profile: {
        type: String
    },
    banner: {
        type: String
    },
    accounttype: {
        type: Number
    },
    myRefCode: {
        type: String
    },
    kioskid: {
        type: String
    },
    wishlist: [wishlist],
    freezer: [freezer],
    transaction: [transaction],
    address: [address]

})

const userIndividual = mongoose.model("individualAccount", model, "dataIndividualAccount")

module.exports = userIndividual