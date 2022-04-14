const asyncHandler = require('express-async-handler')
const kioskModel = require('../model/kioskModel')
const productModel = require('../model/productModel')

const checkName = asyncHandler(async (req, res) => {
    const {name} = req.params

    const isAvailable = await kioskModel.findOne({search: name})

    if(isAvailable) {
        return res.status(200).json({msg : "Name is used", code: 10})
    } else {
        return res.status(200).json({msg: "Name is safe", code: 200})
    }
})

const checkDomain = asyncHandler(async (req, res) => {
    const {domain} = req.params

     const isAvailable = await kioskModel.findOne({ domain: domain });

     if (isAvailable) {
       return res.status(200).json({ msg: "Domain is used", code: 10 });
     } else {
       return res.status(200).json({ msg: "Domain is safe", code: 200 });
     }
})

const getKiosk = asyncHandler(async (req, res) => {
    const {id} = req.params

    const kiosk = await kioskModel.findOne({id: id})
    const productSize = await productModel.find({kioskId: id})

    if(kiosk) {
        if(productSize) {
                    res
                      .status(200)
                      .json({
                        msg: "Succes",
                        code: 200,
                        kiosk: kiosk,
                        productSize: productSize,
                      });

        } else {
                    res
                      .status(200)
                      .json({
                        msg: "Succes",
                        code: 200,
                        kiosk: kiosk,
                        productSize: [],
                      });

        }
    } else {
        res.status(404).json({msg: "not found", code: 404})
    }
})


const openKiosk = asyncHandler(async (req, res) => {
    const { id, name, domain, search, fullAddress, addressDetails, longitude, latitude } = req.body;

    const kiosk = new kioskModel({
      id: id,
      name: name,
      domain: domain,
      search: search,
      fullAddress: fullAddress,
      addressDetails: addressDetails,
      profile:
        "https://png.pngtree.com/png-vector/20190118/ourlarge/pngtree-vector-shop-icon-png-image_327584.jpg",
        longitude: longitude,
        latitude: latitude
    });

    try {
        await kiosk.save()
        res.status(200).json({msg: "Kiosk created successfull", code: 200, kiosk: kiosk})
    } catch (err) {
        res.status(400).json({msg: "error", code: 400})
    }
})

module.exports = {checkName, checkDomain, openKiosk, getKiosk}