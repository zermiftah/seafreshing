const asyncHandler = require('express-async-handler')
const bannerModel = require('../model/bannerModel')

const addBanner = asyncHandler(async (req, res) => {
    const {imgUrl, id} = req.body

    const banner = new bannerModel({
        id: id,
        imgUrl: imgUrl
    })

    await banner.save()

    res.status(200).json({msg: "Success", code: 200, banner: banner})
    
})

const getAllBanner = asyncHandler(async (req, res) => {

    const allBanner = await bannerModel.find({})

    res.status(200).json({msg : "Success", code: 200, banner: allBanner})
})

const deleteBannerId = asyncHandler(async (req, res) => {
    const {id} = req.body

    bannerModel.deleteOne({id: id}).then(resDelete => {
        if(resDelete) {
            res.status(200).json({msg : "Success", code : 200})
        } else {
            res.status(400).json({ msg: "Failed", code: 400 });

        }
    }).catch(e => {
        res.status(400).json({ msg: "Failed", code: 400 });

    })
})

const deleteAllBanner = asyncHandler(async (req, res) => {
    bannerModel.deleteMany({}).then(resDelete => {
         if (resDelete) {
           res.status(200).json({ msg: "Success", code: 200 });
         } else {
           res.status(400).json({ msg: "Failed", code: 400 });
         }
    }).catch(e => {
        res.status(400).json({ msg: "Failed", code: 400 });

    })
})

module.exports = {addBanner, getAllBanner, deleteAllBanner, deleteBannerId}