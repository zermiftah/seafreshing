const mongoose = require('mongoose')


const imageProduct = new mongoose.Schema({
    imgUrl : {
        type: String
    },
    id: {
        type: String
    }
})


const wholeSaleModel = new mongoose.Schema({
    totalMinimum: {
        type: Number
    },
    price: {
        type: String
    },
    unit: {
      type: String
    }
})

const productModel = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
      type: String
  },
  price: {
    value: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  wholeSale: [wholeSaleModel],
  availableStock: {
    total: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
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
  preorder: {
    duration: {
      type: String,
    },
    unit: {
      type: String,
    },
  },
  sku: {
    type: String,
  },
  isWholesale: {
    type: Boolean,
  },
  isPreorder: {
    type: Boolean,
  },
  image: [imageProduct],
  productDescription: {
    type: String,
  },
  kioskId: {
      type: String
  },
  kioskName: {
      type: String
  },
  kioskPicture: {
      type: String
  }
});

const model = mongoose.model("productModel", productModel, "dataProduct")

module.exports = model