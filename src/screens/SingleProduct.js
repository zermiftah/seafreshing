import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import axios from "axios";
import HeaderHS from "../components/HeaderHS";


const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(0);
  const userData = JSON.parse(localStorage.getItem('user-data'));
  const token = JSON.parse(localStorage.getItem('token'));
  const qs = require('qs');

  console.log(product)

  useEffect(() => {
    fetchproduct();
  }, []);

  const fetchproduct = async () => {
    try {
      const data = await axios.get(`http://103.102.152.201:3001/api/product/get-product/${match.params.id}`)
      let temp = data.data.product;
      setProduct(temp)
    } catch (e) {
      return e.response.data.msg
    }
  }

  const handleAddToCart = async () => {
    try {
      let response = await axios.patch('http://103.102.152.201:3001/api/user/add-freezer', JSON.stringify({
        'clearPrice': product[0].price.value.replace(/\D/g, ''),
        'productId': match.params.id,
        'image': product[0].image[0].imgUrl,
        'name': product[0].productName,
        'price': product[0].price.value,
        'priceUnit': "Kg",
        'productQuantity': 12,
        'kioskName': product[0].kioskName,
        'kioskId': product[0].kioskId,
        'idUser': userData.id,
        'kioskCity': product[0].kioskDetails[0].city,
        'minimumOrder': product[0].minimumOrder.total,
        'isWholesalePrice': product[0].isWholesalePrice,
        'isChecked': true,
      }), {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        }
      });
      // console.log(response.data)
    } catch (e) {
      console.log(e)
      console.log(e.response.data)
    }
  }

  const handleAddWishlist = async () => {
    try {
      let response = await axios.patch('http://103.102.152.201:3001/api/user/add-wishlist', {
        'id': userData.id,
        'productId': match.params.id,
        'image': product[0].image[0].imgUrl,
        'name': product[0].productName,
        'price': product[0].price.value,
        'rating': '',
        'productQuantity': quantity,
        'priceUnit': "Kg",
        'kioskName': product[0].kioskName,
        'kioskId': product[0].kioskId,
        'idUser': userData.id,
        'kioskCity': product[0].kioskDetails[0].city,
        'minimumOrder': product[0].minimumOrder.total,
        'isWholesale': product[0].isWholesalePrice,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        }
      });
      console.log(response.data)
    } catch (e) {
      console.log(e)
      console.log(e.response.data)
    }
  }

  return (
    <>
      {
        token ?
          <HeaderHS />
          :
          <Header />
      }
      {
        product[0] ?
          <div className="container single-product">
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product[0].image[0].imgUrl} alt={product.productName} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product[0].productName}</div>
                  </div>
                  <p>{product[0].productDescription}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Price</h6>
                      <span>{product[0].price.value}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {
                        product[0].availableStock.total > 0 ? (
                          <span>In Stock</span>
                        ) : (
                          <span>unavailable</span>
                        )
                      }
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reviews</h6>
                    </div>
                    {
                      product[0].availableStock.total > 0 ? (
                        <>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Quantity</h6>
                            <select value={quantity} onChange={(e) => setQuantity(e.target.value)} required>
                              <option selected>Select Quantity</option>
                              {
                                [...Array(product[0].availableStock.total).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                          {
                            userData ?
                              <div className="d-flex justify-content-between gap-1">
                                <button onClick={handleAddWishlist} className="round-black-btn">Wishlist</button>
                                <button onClick={handleAddToCart} className="round-black-btn">Add To Cart</button>
                              </div>
                              :
                              <Link to='/login' className="d-flex justify-content-center">You must login to add to cart</Link>
                          }
                        </>
                      ) : null
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">REVIEWS</h6>
                <Message variant={"alert-info mt-3"}>No Reviews</Message>
                <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                  <strong>{product[0].kioskName}</strong>

                  <span>Jan 12 2021</span>
                  <div className="alert alert-info mt-3">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                {
                  userData ?
                    <>
                      <h6>WRITE A CUSTOMER REVIEW</h6>
                      <div className="my-4"></div>

                      <form>
                        <div className="my-4">
                          <strong>Rating</strong>
                          <select className="col-12 bg-light p-3 mt-2 border-0 rounded">
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>
                        </div>
                        <div className="my-4">
                          <strong>Comment</strong>
                          <textarea
                            row="3"
                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                          ></textarea>
                        </div>
                        <div className="my-3">
                          <button className="col-12 bg-black border-0 p-3 rounded text-white">
                            SUBMIT
                          </button>
                        </div>
                      </form>
                    </>
                    :
                    <>
                      <div className="my-3">
                        <Message variant={"alert-warning"}>
                          Please{" "}
                          <Link to="/login">
                            " <strong>Login</strong> "
                          </Link>{" "}
                          to write a review{" "}
                        </Message>
                      </div>
                    </>
                }
              </div>
            </div>
          </div>
          : "Loading..."
      }
    </>
  );
};

export default SingleProduct;
