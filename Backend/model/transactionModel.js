const mongoose = require('mongoose')



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
    },
    unit: {
      type: String,
    },
  },

  quantityUnit: {
    total: {
      type: Number,
    },
    unit: {
      type: String,
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
    type: Number,
  },
  estDelivery: {
    type: String,
  },
  deliveryCost: {
    type: Number,
  },
  product: [freezerProduct],
});


const transaction = new mongoose.Schema({
  userId: {
      type: String,
  },
  payId: {
    type: String,
  },
  userName: {
      type: String
  },
  totalPayment: {
    type: Number,
  },
  paymentMethod: {
    type: Number,
  },
  paymentMethodDis: {
    type: String,
  },
  paymentLogo: {
    type: String,
  },
  paymentStatus: {
    type: Number,
  },
  accountName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  createTimestamp: {
    type: String,
  },
  freezer: [freezer],
});





const model = mongoose.model("transaction", transaction, "transactionData")

module.exports = model