const asyncHandler = require("express-async-handler")

const productModel = require('../model/productModel')


const addProduct = asyncHandler(async (req, res) => {
  const {
    id,
    productName,
    price,
    wholesale,
    availableStock,
    minimumOrder,
    preorder,
    sku,
    isWholesale,
    isPreorder,
    image,
    productDescription,
    category,
    kioskId,
    kioskName,
    kioskPicture
  } = req.body;

  const product = new productModel({
    id: id,
    productName: productName,
    price: price,
    wholeSale: wholesale,
    availableStock: availableStock,
    minimumOrder: minimumOrder,
    preorder: preorder,
    sku: sku,
    isWholesale: isWholesale,
    isPreorder: isPreorder,
    image: image,
    productDescription: productDescription,
    category: category,
    kioskId: kioskId,
    kioskName: kioskName,
    kioskPicture:
      "https://png.pngtree.com/png-vector/20190118/ourlarge/pngtree-vector-shop-icon-png-image_327584.jpg",
  });

  await product.save()

  res.status(200).json({ msg: "Success", code: 200, product: product })

})

const deleteProduct = asyncHandler(async (req, res) => {
  await productModel.findByIdAndDelete(req.params.id)
  res.status(200).json({ msg: "Success", code: 200 })
})

const setProductPrice = asyncHandler(async (req, res) => {
  const { id, price } = req.body;

  productModel.findOneAndUpdate({ id: id }, { $set: { price: price } }).then(response => {
    res.status(200).json({ msg: "Success", code: 200 })
  }).catch(err => {
    res.status(500).json({ msg: "error", code: 500 })
  })
})


const setProductQuantity = asyncHandler(async (req, res) => {
  const { id, quantity } = req.body;

  productModel.findOneAndUpdate({ id: id }, { $set: { availableStock: quantity } }).then(response => {
    res.status(200).json({ msg: "Success", code: 200 })
  }).catch(err => {
    res.status(400).json({ msg: "Failed", code: 400 })
  })



})

const getAllProduct = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await productModel.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.results = await productModel.find().limit(limit).skip(startIndex).exec();
    res.status(200).json({ msg: "Success", code: 200, product: results })
  } catch (e) {
    res.status(500).json({ msg: "error", code: 500 });
  }
})

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }

    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ msg: "error", code: 500 })
    }
  }
}

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  const product = await productModel.findOne({ id: id })

  res.status(200).json({ msg: "Success", code: 200, product: product })
})

const getKioskProduct = asyncHandler(async (req, res) => {
  const { kiosk } = req.params

  const product = await productModel.find({ kioskId: kiosk })

  if (product) {
    res.status(200).json({ msg: "Success", code: 200, product: product })
  } else {
    res.status(404).json({ msg: "not found", code: 404 })
  }
})

module.exports = { addProduct, getAllProduct, getProduct, getKioskProduct, setProductQuantity, setProductPrice, deleteProduct }