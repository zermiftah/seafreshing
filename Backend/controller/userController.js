const asyncHandler = require('express-async-handler');
const modelIndividual = require('../model/userModelIndividual')
const modelBusiness = require('../model/userModelBusiness')
const referralCode = require('../model/referralCodeModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyModel = require('../model/verifyModel')
const mailgun = require("mailgun-js");
const model = require('../model/referralCodeModel');
const transaction = require('../model/transactionModel')
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const loginIndividual = asyncHandler(async (req, res) => {
    const {id, password} = req.body
    const user = await modelIndividual.findOne().or([{mobilenumber: id}, {email: id}])

    if(!user) return res.status(404).json({msg: "User not found", code: 404})

    const validPass = await bcrypt.compare(password, user.password)
    if(!validPass) return res.status(401).json({msg : "Wrong password", code: 401})

    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET)

    res.status(200).json({msg : "Success", code: 200, user: user, token: token})
})

const loginEmail= asyncHandler(async (req, res) => {
  const {email, password} = req.body
  const user = await modelIndividual.findOne().or([{email: email}])

  if(!user) return res.status(404).json({msg: "User not found", code: 404})

  const validPass = await bcrypt.compare(password, user.password)
  if(!validPass) return res.status(401).json({msg : "Wrong password", code: 401})

  const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET)

  res.status(200).json({msg : "Success", code: 200, user: user, token: token})
})

const changeStateVerifyEmailIndividual = asyncHandler(async (req, res) => {
    const {id, state} = req.body

    const user = await modelIndividual
      .findOne({ id: id });

      if(!user) return res.status(404).json({msg: "user not found", code : 404})

      modelIndividual.updateOne({id: id}, {$set: {isVerifiedEmail: state}}).then(response => {
          res.status(200).json({msg : "Success", code: 200})
      }).catch(e => {
          res.status(400).json({msg: "Failed", code: 400})
      })


})

const verifyCode = asyncHandler(async (req, res) => {
    const {code, requestId, email, id} = req.body

    verifyModel
      .findOne({ requestId: requestId })
      .then((response) => {
        if (
          response.email == email &&
          response.id == id &&
          response.code == code
        ) {
          res.status(200).json({ code: 200, msg: "Success" });
        } else {
          res.status(401).json({ code: 401, msg: "Wrong code" });
        }
      })
      .catch((e) => {
        res.status(400).json({ code: 400, msg: "Failure" });
      });
})

const changeStateVerifyEmailBusiness = asyncHandler(async (req, res) => {
  const { id, state } = req.body;

  const user = await modelBusiness.findOne({ id: id });

  if (!user) return res.status(404).json({ msg: "user not found", code: 404 });

  modelBusiness
    .updateOne({ id: id }, { $set: { isVerifiedEmail: state } })
    .then((response) => {
      res.status(200).json({ msg: "Success", code: 200 });
    })
    .catch((e) => {
      res.status(400).json({ msg: "Failed", code: 400 });
    });
});

const sendVerificationCode = asyncHandler(async (req, res) => {
    const {requestId, email, id, nameUser} = req.body

    const code = generateCode(6)

    const model = new verifyModel({
        requestId: requestId,
        email: email,
        id: id,
        code: code
    })

    await model.save()

    const emailData = {
      from: "fazriappdev@gmail.com",
      to: email,
      subject: `"Seafreshing" kode verifikasi untuk akun baru anda`,
      html: `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style media="screen and (min-width:480px)">
    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
</head>

<body style="word-spacing:normal;background-color:#fafbfc;">
  <div style="background-color:#fafbfc;">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;line-height:1;text-align:center;color:#11B5DF;">Seafreshing</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:125px;">
                                <img height="auto" src="https://firebasestorage.googleapis.com/v0/b/zeeschool-c4eaa.appspot.com/o/email%20otp.png?alt=media&token=e2a19172-94ac-4500-99c5-8d2465790179" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="125" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;"><span>Hello!, ${nameUser}</span></div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;">Congratulations your seafreshing account has been created</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;">To enjoy all seafreshing services, activate your account using the code below:</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;line-height:1;text-align:center;color:#000000;">${code}</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;">Thanks! <br />Seafreshing team</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>
`,
    };
    mg.messages().send(emailData, function (error, body) {
      if (error) {
        res.status(400).json({ code: 400, msg: "Some wrong" });
      } else {
        res.status(200).json({ code: 200, msg: "Success" });
      }
    });
})

function generateCode(n) {
  var add = 1,
    max = 12 - add;

  if (n > max) {
    return generateCode(max) + generateCode(n - max);
  }
  max = Math.pow(10, n + add);
  var min = max / 10;
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

function makeReferralCode(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const registerBusiness = asyncHandler(async (req, res) => {
  const {id, busname, busaddress, buscity, buszipcode, buscountry, busemail, busmobilenumber, busrefcode, buspassword, isVerifiedEmail, isVerifiedPhone, accounttype, bankname, accountnumber, branch, undername, npwp, usertype, searchbus} = req.body

  const isUserExists = await modelBusiness.findOne().or([{busmobilenumber: busmobilenumber}, {busemail: busemail}, {busname: busname}, {searchbus: searchbus}])

  if(isUserExists) return res.status(200).json({msg : "User has exists", code: 12});

  const isUserExistsInv = await modelIndividual.findOne().or([{mobilenumber: busmobilenumber}, {email: busemail}])
  if(isUserExistsInv) return res.status(200).json({msg: "user has exists", code: 13});



 

  if(busrefcode != "") {
    const findRefcode = await referralCode.findOne({referralCode: busrefcode})

    if(findRefcode) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(buspassword, salt);

      const myRefCode = makeReferralCode(6);

      const user = new modelBusiness({
        id: id,
        busname: busname,
        busaddress: busaddress,
        buscity: buscity,
        buszipcode: buszipcode,
        buscountry: buscountry,
        busemail: busemail,
        busmobilenumber: busmobilenumber,
        busrefcode: busrefcode,
        buspassword: hashPassword,
        isVerifiedEmail: isVerifiedEmail,
        isVerifiedPhone: isVerifiedPhone,
        accounttype: accounttype,
        bankname: bankname,
        accountnumber: accountnumber,
        branch: branch,
        undername: undername,
        npwp: npwp,
        userType: usertype,
        searchbus: searchbus,
        myRefCode: myRefCode,
        profile:
          "https://www.meme-arsenal.com/memes/b6a18f0ffd345b22cd219ef0e73ea5fe.jpg",
        banner:
          "https://cms.sehatq.com/public/img/article_img/manfaat-laut-yang-mungkin-tidak-pernah-anda-bayangkan-sebelumnya-1605251423.jpg",
      });

      const refCode = new referralCode({
        userId: id,
        referralCode: myRefCode,
        usage: 0,
        discount: "10",
      });

      try {
        await user.save();
        await refCode.save();
        const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
        res
          .status(200)
          .json({
            msg: "Register success",
            code: 200,
            user: user,
            token: token,
          });
      } catch (err) {
        res.status(400).json({ msg: err, code: 400 });
      }
    } else {
      res.status(200).json({msg : "refcode not found", code: 15})
    }
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(buspassword, salt);

    const myRefCode = makeReferralCode(6);

    const user = new modelBusiness({
      id: id,
      busname: busname,
      busaddress: busaddress,
      buscity: buscity,
      buszipcode: buszipcode,
      buscountry: buscountry,
      busemail: busemail,
      busmobilenumber: busmobilenumber,
      busrefcode: busrefcode,
      buspassword: hashPassword,
      isVerifiedEmail: isVerifiedEmail,
      isVerifiedPhone: isVerifiedPhone,
      accounttype: accounttype,
      bankname: bankname,
      accountnumber: accountnumber,
      branch: branch,
      undername: undername,
      npwp: npwp,
      userType: usertype,
      searchbus: searchbus,
      myRefCode: myRefCode,
      profile:
        "https://www.meme-arsenal.com/memes/b6a18f0ffd345b22cd219ef0e73ea5fe.jpg",
      banner:
        "https://cms.sehatq.com/public/img/article_img/manfaat-laut-yang-mungkin-tidak-pernah-anda-bayangkan-sebelumnya-1605251423.jpg",
    });

    const refCode = new referralCode({
      userId: id,
      referralCode: myRefCode,
      usage: 0,
      discount: "10",
    });

    try {
      await user.save();
      await refCode.save();
      const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
      res
        .status(200)
        .json({ msg: "Register success", code: 200, user: user, token: token });
    } catch (err) {
      res.status(400).json({ msg: err, code: 400 });
    }
  }

  
})




const setKiosk = asyncHandler(async (req, res) => {
  const {userid, id} = req.body

  modelIndividual.findOne({ id: userid }).updateOne({}, { $set: { kioskid : id} }).then(response => {
    if(response) {
      res
        .status(200)
        .json({ msg: "Success", code: 200, kioskid: response.kioskid });
    } else {
      res.status(400).json({msg : "failed", code: 400})
    }
  }).catch(e => {
    res.status(400).json({msg: "Failed", code: 400})
  }) 
})

const setFullname = asyncHandler(async (req, res) => {
  const {id, fullname} = req.body

  modelIndividual
    .findOne({ id: id })
    .updateOne({}, { $set: { fullname: fullname } }).then(response => {
      if(response) {
        res
          .status(200)
          .json({ msg: "Success", code: 200});
      } else {
        res.status(400).json({msg : "failed", code: 400})
      }
    }).catch(e => {
      res.status(400).json({msg: "Failed", code: 400})
    })
})

const setProfilePicture = asyncHandler(async (req, res) => {
  const {id, url} = req.body

  modelIndividual.findOne({id: id}).updateOne({}, {$set: {profile: url}}).then(response => {
    if(response) {
      res
        .status(200)
        .json({ msg: "Success", code: 200});
    } else {
      res.status(400).json({msg : "failed", code: 400})
    }
  }).catch(e => {
    res.status(400).json({msg: "Failed", code: 400})
  })
})

const setBannerPicture = asyncHandler(async (req, res) => {
  const { id, url } = req.body;

  modelIndividual
    .findOne({ id: id })
    .updateOne({}, { $set: { banner: url } })
    .then((response) => {
      if (response) {
        res.status(200).json({ msg: "Success", code: 200 });
      } else {
        res.status(400).json({ msg: "failed", code: 400 });
      }
    })
    .catch((e) => {
      res.status(400).json({ msg: "Failed", code: 400 });
    });
});

const getAllFreezer = asyncHandler(async (req, res) => {
  const {userid} = req.params

  modelIndividual.findOne({ id: userid }).then(response => {
    if(response) {
      res
        .status(200)
        .json({ msg: "Success", code: 200, freezer: response.freezer });
    } else {
      res.status(400).json({msg : "failed", code: 400})
    }
  }).catch(e => {
    res.status(400).json({msg: "Failed", code: 400})
  }) 
})



const getAllWishlist = asyncHandler(async (req, res) => {
  const {id, accounttype} = req.params

  if(accounttype == 0) {
    modelIndividual.findOne({id: id}).select("wishlist").then(response => {
      res.status(200).json({msg: "Success", code: 200, wishlist: response})
    }).catch(e => {
      res.status(400).json({msg: "Failed", code: 400})
    })
  } else {
    modelBusiness
      .findOne({ id: id })
      .select("wishlist")
      .then((response) => {
        res.status(200).json({ msg: "Success", code: 200, wishlist: response });
      })
      .catch((e) => {
        res.status(400).json({ msg: "Failed", code: 400 });
      });
  }
})


const deleteWishlist = asyncHandler(async (req, res) => {
  const {id, accounttype, productId} = req.body

  if (accounttype == 0) {
    modelIndividual
      .findOne({ id: id })
      .updateOne(
        {},
        {
          $pull: {
            wishlist: {
              id: productId
            }
          },
        }
      )
      .then((response) => {
        if (response) {
          res.status(200).json({ msg: "Success", code: 200 });
        } else {
          res.status(400).json({ msg: "Failed", code: 400 });
        }
      })
      .catch((e) => {
        res.status(400).json({ msg: "Failed", code: 400 });
      });
  } else {
    modelBusiness
      .findOne({ id: id })
      .updateOne(
        {},
        {
          $pull: {
            wishlist: {
              id: productId
            }
          },
        }
      )
      .then((response) => {
        if (response) {
          res.status(200).json({ msg: "Success", code: 200 });
        } else {
          res.status(400).json({ msg: "Failed", code: 400 });
        }
      })
      .catch((e) => {
        res.status(400).json({ msg: "Failed", code: 400 });
      });
  }
})


const setFreezerNote = asyncHandler(async (req, res) => {
  const {idUser, productId, freezerId, note, position, freezerPos} = req.body


  modelIndividual
    .updateOne(
      { id: idUser },
      {
        $set: {
          "freezer.$[freezerDoc].product.$[productDoc].note":
            note
        },
      },
      {
        arrayFilters: [
          { "freezerDoc.id": freezerId },
          { "productDoc.id": productId },
        ],
        upsert: true,
      }
    )
    .then((response) => {
      if (response) {
        res
          .status(200)
          .json({
            msg: "Success",
            code: 200,
            position: position,
            freezerPos: freezerPos,
            note: note
            
          });
      } else {
        res.status(400).json({ msg: "Failed", code: 400 });
      }
    })
    .catch((e) => {
      res.status(400).json({ msg: e, code: 400 });
    });

})

const setWholesale = asyncHandler(async (req, res) => {
  const {id, freezerId,priceWholesale,unitWholesale,clearPrice,freezerPos, productId,priceUnit, isWholesale, quantityWholesaleReal, position, minimumOrder} = req.body

  modelIndividual.findOne({id: id, freezer: {$elemMatch: {id: freezerId, product: {$elemMatch: {id: productId}}}}}).select("freezer").then(found => {
    if(found) {
      found.freezer.map(item => {
        if(item.id == freezerId) {
          item.product.map(item2 => {
            if(item2.id == productId) {
              if(isWholesale) {
                var finalQuantity = quantityWholesaleReal
                var finalPrice = priceWholesale


                modelIndividual
                  .updateOne(
                    { id: id },
                    {
                      $set: {
                        "freezer.$[freezerDoc].product.$[productDoc].quantityWholesale":
                          finalQuantity,
                        "freezer.$[freezerDoc].product.$[productDoc].priceWholesale":
                          priceWholesale,
                        "freezer.$[freezerDoc].product.$[productDoc].unitWholesale":
                          unitWholesale,
                        "freezer.$[freezerDoc].product.$[productDoc].quantityWholesaleReal":
                          quantityWholesaleReal,
                        "freezer.$[freezerDoc].product.$[productDoc].isWholesalePrice":
                          isWholesale,
                        "freezer.$[freezerDoc].product.$[productDoc].totalPrice":
                          finalPrice,
                      },
                    },
                    {
                      arrayFilters: [
                        { "freezerDoc.id": freezerId },
                        { "productDoc.id": productId },
                      ],
                      upsert: true,
                    }
                  )
                  .then((response) => {
                    if (response) {
                      res.status(200).json({ msg: "Success", code: 200, position: position, freezerPos: freezerPos, freezerId: freezerId, priceWholesale:priceWholesale, unitWholesale:unitWholesale, quantityWholesaleReal:quantityWholesaleReal, productId: productId, isWholesale: isWholesale, quantity: finalQuantity, totalPrice: finalPrice });
                    } else {
                      res.status(400).json({ msg: "Failed", code: 400 });
                    }
                  })
                  .catch((e) => {
                    res.status(400).json({ msg: e, code: 400 });
                  });
              } else {
                const finalQuantity = item2.productQuantity
                var finalPrice;
                if (priceUnit == item2.productQuantityUnit) {
                  finalPrice = clearPrice * finalQuantity;
                } else {
                  if (priceUnit == "kg") {
                    if (item2.productQuantityUnit == "gram") {
                      finalPrice = (finalQuantity / 1000) * clearPrice;
                    } else if (item2.productQuantityUnit == "ton") {
                      finalPrice = finalQuantity * 1000 * clearPrice;
                    }
                  } else if (priceUnit == "ton") {
                    if (item2.productQuantityUnit == "gram") {
                      finalPrice = (finalQuantity / 1000000) * clearPrice;
                    } else if (item2.productQuantityUnit == "kg") {
                      finalPrice = (finalQuantity / 1000) * clearPrice;
                    }
                  }
                }
                modelIndividual
                  .updateOne(
                    { id: id },
                    {
                      $set: {
                        "freezer.$[freezerDoc].product.$[productDoc].productQuantity":
                          finalQuantity,
                        "freezer.$[freezerDoc].product.$[productDoc].isWholesalePrice":
                          isWholesale,
                        "freezer.$[freezerDoc].product.$[productDoc].totalPrice":
                          finalPrice,
                      },
                    },
                    {
                      arrayFilters: [
                        { "freezerDoc.id": freezerId },
                        { "productDoc.id": productId },
                      ],
                      upsert: true,
                    }
                  )
                  .then((response) => {
                    if (response) {
                      res
                        .status(200)
                        .json({
                          msg: "Success",
                          code: 200,
                          position: position,
                          freezerPos: freezerPos,
                          isWholesale: isWholesale,
                          quantity: finalQuantity,
                          totalPrice: finalPrice,
                        });
                    } else {
                      res.status(400).json({ msg: "Failed", code: 400 });
                    }
                  })
                  .catch((e) => {
                    res.status(400).json({ msg: e, code: 400 });
                  });
              }
            }
          })
        }
      })
    }
  })
})

const deleteContainerFreezer = asyncHandler(async (req, res) => {
  const {id, freezerId} = req.body

  modelIndividual
    .updateOne({ id: id }, { $pull: { freezer: { id: freezerId } } })
    .then((ress) => {
      if (ress) {
        res.status(200).json({ msg: "Success", code: 200 });
      } else {
        res.status(400).json({ msg: "Failed", code: 400 });
      }
    })
    .catch((ee) => {
      res.status(400).json({ msg: "Failed", code: 400 });
    });
})


const deleteFreezer = asyncHandler(async (req, res) => {
  const {id, freezerId, productId, position, freezerPos, isEmpty} = req.body

  modelIndividual.updateOne({id: id, "freezer.id": freezerId}, {$pull: {'freezer.$.product': {id: productId}}}).then(response => {
    if(response) {
      
      
    res
      .status(200)
      .json({
        msg: "Success",
        code: 200,
        position: position,
        freezerPos: freezerPos,
        freezerId: freezerId,
      });

      
    } else {
      res.status(400).json({msg: "Failed", code: 400})
    }
  }).catch(e => {
    res.status(400).json({msg: "Failed", code: 400})
  })

 
})

const setContainerCheckboxSingle = asyncHandler(async (req, res) => {
  const { idUser, isChecked, freezerId, position, freezerPos } = req.body;

  modelIndividual
    .updateOne(
      { id: idUser, "freezer.id": freezerId },
      { $set: { "freezer.$.isCheckAll": isChecked } }
    )
    .then((response) => {
      if (response) {
        res.status(200).json({
          msg: "Success",
          code: 200,
          position: position,
          isChecked: isChecked,
          freezerPos: freezerPos
        });
      } else {
        res.status(400).json({ msg: "Failed", code: 400 });
      }
    })
    .catch((ee) => {
      res.status(400).json({ msg: "Failed", code: 400 });
    });
})


const setItemCheckbox = asyncHandler(async (req, res) => {
  const {idUser, freezerId, productId, isChecked, position, freezerPos} = req.body

 modelIndividual
   .updateOne(
     { id: idUser },
     {
       $set: {
         "freezer.$[freezerDoc].product.$[productDoc].isChecked": isChecked,
       },
     },
     {
       arrayFilters: [
         { "freezerDoc.id": freezerId },
         { "productDoc.id": productId },
       ],
       upsert: true,
     }
   )
   .then((ress) => {
     if (ress) {
       res.status(200).json({
         msg: "Success",
         code: 200,
         position: position,
         isChecked: isChecked,
         freezerId: freezerId,
         freezerPos: freezerPos
       });
     } else {
       res.status(400).json({ msg: "Failed", code: 400 });
     }
   });
})

const setContainerCheckBox = asyncHandler(async (req, res) => {
  const {idUser, isChecked, freezerId, position} = req.body

  modelIndividual.updateOne({id: idUser, "freezer.id": freezerId}, {$set: {"freezer.$.isCheckAll": isChecked}}).then(response => {
    if(response) {
      

      modelIndividual.updateOne(
        { id: idUser },
        {
          $set: {
            "freezer.$[freezerDoc].product.$[productDoc].isChecked": isChecked,
          },
        },
        {
          arrayFilters: [
            { "freezerDoc.id": freezerId },
            { "productDoc.kioskId": freezerId },
          ],
          multi: true
        }
      ).then(ress => {
        if(ress) {
          res.status(200).json({msg: "Success", code: 200, position: position, isChecked: isChecked})
        } else {
          res.status(400).json({ msg: "Failed", code: 400 });

        }
      })
    } else {
      res.status(400).json({msg: "Failed", code: 400})
    }
  }).catch(ee => {
    res.status(400).json({ msg: "Failed", code: 400 });
  })
})

const setQuantityUnit = asyncHandler(async (req, res) => {
  const {
    idUser,
    freezerId,
    productId,
    position,
    freezerPos,
    productQuantity,
    productQuantityUnit,
    priceUnit,
    clearPrice,
  } = req.body;


  var finalQuantity = productQuantity
  var finalPrice;
  if (priceUnit == productQuantityUnit) {
    finalPrice = clearPrice * finalQuantity;
  } else {
    if (priceUnit == "kg") {
      if (productQuantityUnit == "gram") {
        finalPrice = (finalQuantity / 1000) * clearPrice;
      } else if (productQuantityUnit == "ton") {
        finalPrice = finalQuantity * 1000 * clearPrice;
      }
    } else if (priceUnit == "ton") {
      if (productQuantityUnit == "gram") {
        finalPrice = (finalQuantity / 1000000) * clearPrice;
      } else if (productQuantityUnit == "kg") {
        finalPrice = (finalQuantity / 1000) * clearPrice;
      }
    }
  }
                     

  modelIndividual
    .updateOne(
      { id: idUser },
      {
        $set: {
          "freezer.$[freezerDoc].product.$[productDoc].productQuantity":
            productQuantity,
          "freezer.$[freezerDoc].product.$[productDoc].productQuantityUnit":
            productQuantityUnit,
          "freezer.$[freezerDoc].product.$[productDoc].totalPrice": finalPrice,
        },
      },
      {
        arrayFilters: [
          { "freezerDoc.id": freezerId },
          { "productDoc.id": productId },
        ],
        upsert: true,
      }
    )
    .then((response) => {
      if (response) {
        res.status(200).json({ msg: "Success", code: 200, position: position, freezerPos: freezerPos, finalPrice: finalPrice, finalQuantity: finalQuantity, productQuantityUnit: productQuantityUnit });
      } else {
        res.status(400).json({ msg: "Failed", code: 400 });
      }
    })
    .catch((e) => {
      res.status(400).json({ msg: e, code: 400 });
    });
})


const onPlusMinClick = asyncHandler(async (req, res) => {
  const {idUser, freezerId, productId, position, freezerPos, isPlus} = req.body

  modelIndividual.findOne({id: idUser, freezer: {$elemMatch: {id: freezerId, product: {$elemMatch:{id: productId}}}}}).select("freezer").then(data => {
    if(data) {
      data.freezer.map(item => {
        if(item.id == freezerId) {
          item.product.map(item2 => {
            if(item2.id == productId) {
              if(item2.isWholesalePrice) {
                var finalQuantity
                var finalPrice

                if(isPlus) {
                  finalQuantity = item2.quantityWholesale + item2.quantityWholesaleReal;

                  finalPrice = item2.totalPrice + item2.priceWholesale;
                } else {
                  finalQuantity =
                    item2.quantityWholesale - item2.quantityWholesaleReal;

                    finalPrice = item2.totalPrice - item2.priceWholesale;
                }
                
                modelIndividual
                  .updateOne(
                    { id: idUser },
                    {
                      $set: {
                        "freezer.$[freezerDoc].product.$[productDoc].quantityWholesale":
                          finalQuantity,
                        "freezer.$[freezerDoc].product.$[productDoc].totalPrice":
                          finalPrice,
                      },
                    },
                    {
                      arrayFilters: [
                        { "freezerDoc.id": freezerId },
                        { "productDoc.id": productId },
                      ],
                      upsert: true,
                    }
                  )
                  .then((response) => {
                    if (response) {
                      res
                        .status(200)
                        .json({
                          msg: "Success",
                          code: 200,
                          freezerPos: freezerPos,
                          position: position,
                          finalPrice: finalPrice,
                          finalQuantity: finalQuantity,
                        });
                    } else {
                      res.status(400).json({ msg: "Failed", code: 400 });
                    }
                  })
                  .catch((e) => {
                    res.status(400).json({ msg: e, code: 400 });
                  });

              } else {
                var finalQuantity;
                var finalPrice;

                if (isPlus) {
                  finalQuantity =
                    item2.productQuantity + 1

                  if (item2.priceUnit == item2.productQuantityUnit) {
                    finalPrice = item2.clearPrice * finalQuantity;
                  } else {
                    if (item2.priceUnit == "kg") {
                      if (item2.productQuantityUnit == "gram") {
                        finalPrice = (finalQuantity / 1000) * item2.clearPrice;
                      } else if (item2.productQuantityUnit == "ton") {
                        finalPrice = finalQuantity * 1000 * item2.clearPrice;
                      }
                    } else if (item2.priceUnit == "ton") {
                      if (item2.productQuantityUnit == "gram") {
                        finalPrice = (finalQuantity / 1000000) * item2.clearPrice;
                      } else if (item2.productQuantityUnit == "kg") {
                        finalPrice = (finalQuantity / 1000) * item2.clearPrice;
                      }
                    }
                  }
                     
                } else {
                 finalQuantity = item2.productQuantity - 1;

                 if (item2.priceUnit == item2.productQuantityUnit) {
                   finalPrice = item2.clearPrice * finalQuantity;
                 } else {
                   if (item2.priceUnit == "kg") {
                     if (item2.productQuantityUnit == "gram") {
                       finalPrice = (finalQuantity / 1000) * item2.clearPrice;
                     } else if (item2.productQuantityUnit == "ton") {
                       finalPrice = finalQuantity * 1000 * item2.clearPrice;
                     }
                   } else if (item2.priceUnit == "ton") {
                     if (item2.productQuantityUnit == "gram") {
                       finalPrice =
                         (finalQuantity / 1000000) * item2.clearPrice;
                     } else if (item2.productQuantityUnit == "kg") {
                       finalPrice = (finalQuantity / 1000) * item2.clearPrice;
                     }
                   }
                 }
                }

                modelIndividual
                  .updateOne(
                    { id: idUser },
                    {
                      $set: {
                        "freezer.$[freezerDoc].product.$[productDoc].productQuantity":
                          finalQuantity,
                        "freezer.$[freezerDoc].product.$[productDoc].totalPrice":
                          finalPrice,
                      },
                    },
                    {
                      arrayFilters: [
                        { "freezerDoc.id": freezerId },
                        { "productDoc.id": productId },
                      ],
                      upsert: true,
                    }
                  )
                  .then((response) => {
                    if (response) {
                      res.status(200).json({ msg: "Success", code: 200, freezerPos: freezerPos, position: position, finalPrice: finalPrice, finalQuantity: finalQuantity });
                    } else {
                      res.status(400).json({ msg: "Failed", code: 400 });
                    }
                  })
                  .catch((e) => {
                    res.status(400).json({ msg: e, code: 400 });
                  });
              }
            }
          })
        }
      })
    } else {
      res.status(400).json({ msg: "Failed", code: 400 });
    }
  }).catch(e => {
    res.status(400).json({ msg: e, code: 400 });
  })
})


const addFreezer = asyncHandler(async (req, res) => {
  const {
    isWholesale,
    quantityWholesaleReal,
    idUser,
    kioskId,
    kioskName,
    kioskCity,
    productId,
    clearPrice,
    name,
    price,
    minimumOrder,
    image,
    priceUnit,
    productQuantity,
    isWholesalePrice,
    unitWholesale,
    priceWholesale,
    isChecked
  } = req.body;


  modelIndividual.findOne({id: idUser}).then(_ => {
    modelIndividual.findOne({id: idUser, freezer: {$elemMatch: {id: kioskId}}}).then(found => {
      if(found) {
       
        modelIndividual.findOne({id: idUser, freezer: {$elemMatch: {id: kioskId, product: {$elemMatch: {id: productId}}}}}).select("freezer").then(foundLagi => {

          if(foundLagi) {
            foundLagi.freezer.map(item => {
              if(item.id == kioskId) {
                item.product.map(item2 => {
                  if(item2.id == productId) {
                    
                    if(isWholesalePrice) {
                      var finalQuantity
                      var finalPrice
                      if(item2.quantityWholesaleReal == quantityWholesaleReal && item2.isWholesalePrice) {
                        finalQuantity = item2.quantityWholesale + quantityWholesaleReal;
                        finalPrice = item2.totalPrice + priceWholesale;
                      } else {
                        finalQuantity = quantityWholesaleReal;
                        finalPrice = priceWholesale;
                      }
                      modelIndividual
                        .updateOne(
                          { id: idUser },
                          {
                            $set: {
                              "freezer.$[freezerDoc].product.$[productDoc].quantityWholesale":
                                finalQuantity,
                              "freezer.$[freezerDoc].product.$[productDoc].priceWholesale":
                                priceWholesale,
                              "freezer.$[freezerDoc].product.$[productDoc].unitWholesale":
                                unitWholesale,
                              "freezer.$[freezerDoc].product.$[productDoc].quantityWholesaleReal":
                                quantityWholesaleReal,
                              "freezer.$[freezerDoc].product.$[productDoc].isWholesalePrice": isWholesalePrice,
                              "freezer.$[freezerDoc].product.$[productDoc].totalPrice": finalPrice
                            },
                          },
                          {
                            arrayFilters: [
                              { "freezerDoc.id": kioskId },
                              { "productDoc.id": productId },
                            ],
                            upsert: true,
                          }
                        )
                        .then((response) => {
                          if (response) {
                            res.status(200).json({ msg: "Success", code: 200 });
                          } else {
                            res.status(400).json({ msg: "Failed", code: 400 });
                          }
                        })
                        .catch((e) => {
                          res.status(400).json({ msg: e, code: 400 });
                        });
                    } else {
                      const finalQuantity = item2.productQuantity + productQuantity

                      var finalPrice;
                      if (priceUnit == item2.productQuantityUnit) {
                        finalPrice = clearPrice * finalQuantity;
                      } else {
                        if (priceUnit == "kg") {
                          if (item2.productQuantityUnit == "gram") {
                            finalPrice = (finalQuantity / 1000) * clearPrice;
                          } else if (item2.productQuantityUnit == "ton") {
                            finalPrice = finalQuantity * 1000 * clearPrice;
                          }
                        } else if (priceUnit == "ton") {
                          if (item2.productQuantityUnit == "gram") {
                            finalPrice = (finalQuantity / 1000000) * clearPrice;
                          } else if (item2.productQuantityUnit == "kg") {
                            finalPrice = (finalQuantity / 1000) * clearPrice;
                          }
                        }
                      }
                     
                      modelIndividual
                        .updateOne(
                          { id: idUser },
                          {
                            $set: {
                              "freezer.$[freezerDoc].product.$[productDoc].productQuantity":
                                finalQuantity,
                              "freezer.$[freezerDoc].product.$[productDoc].isWholesalePrice":
                                isWholesalePrice,
                                "freezer.$[freezerDoc].product.$[productDoc].totalPrice": finalPrice
                            },
                          },
                          {
                            arrayFilters: [
                              { "freezerDoc.id": kioskId },
                              { "productDoc.id": productId },
                            ],
                            upsert: true,
                          }
                        )
                        .then((response) => {
                          if (response) {
                            res.status(200).json({ msg: "Success", code: 200 });
                          } else {
                            res.status(400).json({ msg: "Failed", code: 400 });
                          }
                        })
                        .catch((e) => {
                          res.status(400).json({ msg: e, code: 400 });
                        });
                    }

                  
                  }
                })
              }
            })
            
          } else {
            if(isWholesalePrice) {
              modelIndividual
                .updateOne(
                  { id: idUser, "freezer.id": kioskId },
                  {
                    $push: {
                      "freezer.$.product": {
                        id: productId,
                        name: name,
                        price: price,
                        minimumOrder: minimumOrder,
                        image: image,
                        clearPrice: clearPrice,
                        isWholesale: isWholesale,
                        priceUnit: priceUnit,
                        productQuantity: minimumOrder.total,
                        productQuantityUnit: minimumOrder.unit,
                        isWholesalePrice: isWholesalePrice,
                        quantityWholesaleReal: quantityWholesaleReal,
                        unitWholesale: unitWholesale,
                        priceWholesale: priceWholesale,
                        quantityWholesale: quantityWholesaleReal,
                        isChecked: isChecked,
                        totalPrice: priceWholesale,
                        kioskId: kioskId
                      },
                    },
                  }
                )
                .then((ress) => {
                  res.status(200).json({ msg: "Success", code: 200 });
                });

            } else {
              var finalPrice
              if(priceUnit ==  minimumOrder.unit) {
                finalPrice = clearPrice * minimumOrder.total

                
              } else {
                if(priceUnit == "kg") {
                  if(minimumOrder.unit == "gram") {
                    finalPrice = minimumOrder.total / 1000 * clearPrice
                  } else if(minimumOrder.unit == "ton") {
                    finalPrice = minimumOrder.total * 1000 * clearPrice
                  }
                }  else if(priceUnit == "ton") {
                  if(minimumOrder.unit == "gram") {
                    finalPrice = minimumOrder.total / 1000000 * clearPrice
                  } else if(minimumOrder.unit == "kg") {
                    finalPrice = minimumOrder.total / 1000 * clearPrice
                  }
                }
              }
              modelIndividual
                .updateOne(
                  { id: idUser, "freezer.id": kioskId },
                  {
                    $push: {
                      "freezer.$.product": {
                        id: productId,
                        name: name,
                        price: price,
                        minimumOrder: minimumOrder,
                        image: image,
                        clearPrice: clearPrice,
                        isWholesale: isWholesale,
                        priceUnit: priceUnit,
                        productQuantity: minimumOrder.total,
                        productQuantityUnit: minimumOrder.unit,
                        isWholesalePrice: isWholesalePrice,
                        isChecked: isChecked,
                        totalPrice: finalPrice,
                        kioskId: kioskId,
                      },
                    },
                  }
                )
                .then((ress) => {
                  res.status(200).json({ msg: "Success", code: 200 });
                });

            }
            
          }
        })
        
       
      } else {
        if(isWholesalePrice) {
          modelIndividual
            .findOne({ id: idUser })
            .updateOne(
              {},
              {
                $push: {
                  freezer: [
                    {
                      id: kioskId,
                      kioskName: kioskName,
                      kioskCity: kioskCity,
                      isCheckAll: true,
                      product: [
                        {
                          id: productId,
                          name: name,
                          price: price,
                          minimumOrder: minimumOrder,
                          image: image,
                          clearPrice: clearPrice,
                          isWholesale: isWholesale,
                          priceUnit: priceUnit,
                          productQuantity: minimumOrder.total,
                          productQuantityUnit: minimumOrder.unit,
                          isWholesalePrice: isWholesalePrice,
                          quantityWholesaleReal: quantityWholesaleReal,
                          priceWholesale: priceWholesale,
                          unitWholesale: unitWholesale,
                          quantityWholesale: quantityWholesaleReal,
                          isChecked: isChecked,
                          totalPrice: priceWholesale,
                          kioskId: kioskId,
                        },
                      ],
                    },
                  ],
                },
              }
            )
            .then((response) => {
              if (response) {
                res.status(200).json({ msg: "Success", code: 200 });
              } else {
                res.status(400).json({ msg: "failed", code: 400 });
              }
            })
            .catch((e) => {
              res.status(400).json({ msg: "Failed", code: 400 });
            });
        } else {
          var finalPrice;
          if (priceUnit == minimumOrder.unit) {
            finalPrice = clearPrice * minimumOrder.total;
          } else {
            if (priceUnit == "kg") {
              if (minimumOrder.unit == "gram") {
                finalPrice = (minimumOrder.total / 1000) * clearPrice;
              } else if (minimumOrder.unit == "ton") {
                finalPrice = minimumOrder.total * 1000 * clearPrice;
              }
            }  else if (priceUnit == "ton") {
              if (minimumOrder.unit == "gram") {
                finalPrice = (minimumOrder.total / 1000000) * clearPrice;
              } else if (minimumOrder.unit == "kg") {
                finalPrice = (minimumOrder.total / 1000) * clearPrice;
              }
            }
          }
          modelIndividual
            .findOne({ id: idUser })
            .updateOne(
              {},
              {
                $push: {
                  freezer: [
                    {
                      id: kioskId,
                      kioskName: kioskName,
                      kioskCity: kioskCity,
                      isCheckAll: true,
                      product: [
                        {
                          id: productId,
                          name: name,
                          price: price,
                          minimumOrder: minimumOrder,
                          image: image,
                          clearPrice: clearPrice,
                          isWholesale: isWholesale,
                          priceUnit: priceUnit,
                          productQuantity: minimumOrder.total,
                          productQuantityUnit: minimumOrder.unit,
                          isWholesalePrice: isWholesalePrice,
                          isChecked: isChecked,
                          totalPrice: finalPrice,
                          kioskId: kioskId,
                        },
                      ],
                    },
                  ],
                },
              }
            )
            .then((response) => {
              if (response) {
                res.status(200).json({ msg: "Success", code: 200 });
              } else {
                res.status(400).json({ msg: "failed", code: 400 });
              }
            })
            .catch((e) => {
              res.status(400).json({ msg: "Failed", code: 400 });
            });
        }
        
      }
    }).catch(e => {
      res.status(400).json({msg: "Failed", code: 400})
      
    })
  })

  
})


const addWishlist = asyncHandler(async (req, res) => {
  const {
    id,
    productId,
    name,
    image,
    rating,
    price,
    isWholesale,
    minimumOrder,
    kioskId,
    kioskName,
    priceUnit
  } = req.body;

  
   modelIndividual
     .findOne({ id: id })
     .updateOne(
       {},
       {
         $push: {
           wishlist: [
             {
               id: productId,
               name: name,
               price: price,
               image: image,
               rating: rating,
               isWholesale: isWholesale,
               minimumOrder: minimumOrder,
               kioskId: kioskId,
               kioskName: kioskName,
               priceUnit: priceUnit
             },
           ],
         },
       }
     )
     .then((response) => {
       if (response) {
         res.status(200).json({ msg: "Success", code: 200 });
       } else {
         res.status(400).json({ msg: "Failed", code: 400 });
       }
     })
     .catch((e) => {
       res.status(400).json({ msg: "Failed", code: 400 });
     });

   
  
})

const login = asyncHandler(async (req, res) => {
  const {id, password, search} = req.body

  const business = await modelBusiness.findOne().or([{busmobilenumber: id}, {busemail: id}, {busname: id}, {searchbus : search}])
  if(business) {
    const validPass = await bcrypt.compare(password, business.buspassword)
    if(!validPass) return res.status(401).json({msg : "Wrong password", code: 401})

    const token = jwt.sign({_id: business.id}, process.env.TOKEN_SECRET)

    res.status(200).json({msg: "Success login", token: token, code: 200, user: business})
  } else {
    const user = await modelIndividual.findOne().or([{mobilenumber: id}, {email: id}])
    if(user) {
      const validPassword = await bcrypt.compare(password, user.password)
      if(!validPassword) return res.status(401).json({msg: "Wrong password", code: 401})

      const tokenUser = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET)

      res.status(200).json({msg: "Success login", token: tokenUser, code: 200, user: user})
    } else {
      res.status(404).json({msg : "User not found", code: 404})
    }
  }

})

const getUserInfo = asyncHandler(async (req, res) => {
  const {id, accounttype} = req.params

  if(accounttype == 0 || !accounttype) {
    const individual = await modelIndividual.findOne({_id: id})

    if(!individual) return res.status(404).json({msg: "User not found", code: 404})

    res.status(200).json({msg: "User found", code: 200, user: individual})
  } else {
    const business = await modelBusiness.findOne({ id: id });

    if (!business)
      return res.status(404).json({ msg: "User not found", code: 404 });

    res.status(200).json({ msg: "User found", code: 200, user: business });
  }
})

const saveAddress = asyncHandler(async (req, res) => {
  const {userId, city, zipcode, latlng, district, subdistrict, province, isUsed, label, fullAddress, mobileNumber, receivedName, isPin} = req.body

  modelIndividual.updateOne({id: userId}, {$push: {
    address: [
      {
        city:city,
        zipCode: zipcode,
        latlng: latlng,
        district: district,
        subdistrict: subdistrict,
        province: province,
        isUsed: isUsed,
        label: label,
        fullAddress: fullAddress,
        mobileNumber: mobileNumber,
        receivedName: receivedName,
        isPin: isPin
      }
    ]
  }}).then(reponse => {
    if(reponse) {
      res.status(200).json({msg: "Success", code: 200})
    } else {
      res.status(400).json({msg: "Failed", code: 400})
    }
  }).catch(e => {
    res.status(400).json({msg: "Failed", code: 400})
  })
})

const getAddress = asyncHandler(async (req, res) => {
  const {userId} = req.params

  const address = await modelIndividual.findOne({id: userId}).select('address')

  if(address) {
    res.status(200).json({msg: "Success", code: 200, address: address})
  } else {
    res.status(400).json({msg: "Failed", code: 400})
  }
})

const registerindividual = asyncHandler(async (req, res) => {
    const {id, name, address, city, zip, country, email, mobilenumber, refcode, password, accounttype} = req.body;


    const isUserExistsPhone = await modelIndividual.findOne({mobilenumber : mobilenumber})

    if(isUserExistsPhone) return res.status(200).json({msg: "User has exists", code: 12})

    
    const isUserExistsEmail = await modelIndividual.findOne({
      email: email,
    });

      if (isUserExistsEmail)
      return res.status(200).json({ msg: "User has exists", code: 12 });

      const isUserBusiness = await modelBusiness.findOne().or([{busemail: email}, {busmobilenumber: mobilenumber}])
      if(isUserBusiness) return res.status(200).json({ msg: "User has exists", code: 12 });

      if(refcode != "") {
        const findRefcode = await referralCode.findOne({referralCode: refcode})

        if(findRefcode) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);

          const myRefCode = makeReferralCode(6);

          const user = new modelIndividual({
            id: id,
            fullname: name,
            city: city,
            address: address,
            zipcode: zip,
            country: country,
            email: email,
            refcode: refcode,
            mobilenumber: mobilenumber,
            password: hashPassword,
            isVerifiedEmail: false,
            isVerifiedPhone: false,
            accounttype: accounttype,
            myRefCode: myRefCode,
            profile:
              "https://www.meme-arsenal.com/memes/b6a18f0ffd345b22cd219ef0e73ea5fe.jpg",
            banner:
              "https://cms.sehatq.com/public/img/article_img/manfaat-laut-yang-mungkin-tidak-pernah-anda-bayangkan-sebelumnya-1605251423.jpg",
          });

          const refCode = new referralCode({
            userId: id,
            referralCode: myRefCode,
            usage: 0,
            discount: "10",
          });

          try {
            await user.save();
            await refCode.save();
            const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
            res
              .status(200)
              .json({
                msg: "Register success",
                code: 200,
                user: user,
                token: token,
              });
          } catch (err) {
            res.status(400).json({ msg: err, code: 400 });
          }
        } else {
          res.status(200).json({msg : "Ref code not found", code : 15})
        }
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const myRefCode = makeReferralCode(6);

        const user = new modelIndividual({
          id: id,
          fullname: name,
          city: city,
          address: address,
          zipcode: zip,
          country: country,
          email: email,
          refcode: refcode,
          mobilenumber: mobilenumber,
          password: hashPassword,
          isVerifiedEmail: false,
          isVerifiedPhone: false,
          accounttype: accounttype,
          myRefCode: myRefCode,
          profile:
            "https://www.meme-arsenal.com/memes/b6a18f0ffd345b22cd219ef0e73ea5fe.jpg",
          banner:
            "https://cms.sehatq.com/public/img/article_img/manfaat-laut-yang-mungkin-tidak-pernah-anda-bayangkan-sebelumnya-1605251423.jpg",
        });

        const refCode = new referralCode({
          userId: id,
          referralCode: myRefCode,
          usage: 0,
          discount: "10",
        });

        try {
          await user.save();
          await refCode.save();
          const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
          res
            .status(200)
            .json({
              msg: "Register success",
              code: 200,
              user: user,
              token: token,
            });
        } catch (err) {
          res.status(400).json({ msg: err, code: 400 });
        }
      }

      
})


const createPayment = asyncHandler(async (req, res) => {
  const {
    userId,
    payId,
    totalPayment,
    userName,
    paymentMethod,
    accountNumber,
    accountName,
    paymentMethodDis,
    paymentLogo,
    paymentStatus,
    createTimestamp,
    product,
  } = req.body;

    const transactionModel = new transaction({ 
      userId: userId,     
         payId: payId,
          totalPayment: totalPayment,
          paymentMethod: paymentMethod,
          paymentMethodDis: paymentMethodDis,
          paymentLogo: paymentLogo,
          paymentStatus: paymentStatus,
          createTimestamp: createTimestamp,
          freezer: product,
          accountNumber: accountNumber,
          accountName: accountName,
          userName: userName,
        
      
    });

    try {
      await transactionModel.save();
      res.status(200).json({ msg: "Payment added", code: 200 });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Payment failed", code: 400 });
    }
  
 
})

const getTranasction = asyncHandler(async (req, res) => {
  const {payId} = req.params

  const transactionFind = await transaction.findOne({
    payId: payId
  });

  if(transactionFind) {
    res
      .status(200)
      .json({ msg: "Payment found", code: 200, transaction: transactionFind });
  } else {
    res.status(400).json({ msg: "Payment not found", code: 400 });
  }
})

module.exports = {loginEmail, registerindividual,getAddress, saveAddress,createPayment,getTranasction,onPlusMinClick, setFreezerNote,setContainerCheckboxSingle,setQuantityUnit,deleteContainerFreezer,setWholesale, setItemCheckbox, setContainerCheckBox, setFullname,setProfilePicture,setBannerPicture,addFreezer,deleteFreezer, getAllFreezer, deleteWishlist, setKiosk, getAllWishlist, addWishlist,getUserInfo ,login, changeStateVerifyEmailBusiness, registerBusiness, changeStateVerifyEmailIndividual, loginIndividual, sendVerificationCode, verifyCode}

