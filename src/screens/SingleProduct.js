import React, { useEffect, useState } from "react";
import HeaderHS from "../components/HeaderHS";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import axios from "axios";


const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState([])
  const [buyKg, setBuyKg] = useState(false);
  const [buyKwintal, setBuyKwintal] = useState(false);
  const [buyTon, setBuyTon] = useState(false);
  const [unit, setUnit] = useState('');
  const [qtKg, setQtKg] = useState('');
  const [qtKwintal, setQtKwintal] = useState('');
  const [qtTon, setQtTon] = useState('');

  const userData = JSON.parse(localStorage.getItem('user-data'));
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    fetchproduct();
  }, []);

  const fetchproduct = async () => {
    try {
      const data = await axios.get(`http://103.102.152.201:3001/api/product/get-product/${match.params.id}`)
      let temp = data.data.product
      setProduct(temp)
    } catch (e) {
      return e.response.data.msg
    }
  }

  const handleKg = () => {
    setBuyKg(true);
    setBuyTon(false);
    setUnit('Kilogram');
  }

  const handleKwintal = () => {
    setBuyTon(true);
    setBuyKg(false);
    setUnit('Kwintal');
  }

  const handleTon = () => {
    setBuyTon(true);
    setBuyKg(false);
    setUnit('Ton');
  }

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const qs = require('qs');

    try {
      let response = await axios.patch('http://103.102.152.201:3001/api/user/add-freezer', qs.stringify({
        'clearPrice': product[0].price.value.replace(/\D/g, ''),
        'id': match.params.id,
        'image': product[0].image[0].imgUrl,
        'name': product[0].productName,
        'price': product[0].price.value,
      }), {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        }
      });
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <HeaderHS />
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
                      <Rating
                        value={product[0].rating}
                        text={`${product[0].numReviews} reviews`}
                      />
                    </div>
                    {
                      product[0].availableStock.total > 0 ? (
                        <>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Buy per</h6>
                            <div className="btn-group" role="group">
                              <button onClick={handleKg} type="button" className="btn btn-outline-primary">Kg</button>
                              <button onClick={handleKwintal} type="button" className="btn btn-outline-primary">Kwintal</button>
                              <button onClick={handleTon} type="button" className="btn btn-outline-primary">Ton</button>
                            </div>
                          </div>
                          {
                            buyKg && (
                              <div className="flex-box d-flex justify-content-between align-items-center">
                                <h6>Quantity</h6>
                                <select value={qtKg} onChange={(e) => setQtKg(e.target.value)}>
                                  {
                                    [...Array(product[0].availableStock.total).keys()].map((x) => (
                                      x >= 1 ?
                                        <option key={x * 10} value={x * 10}>
                                          {x * 10}
                                        </option>
                                        : ""
                                    ))
                                  }
                                </select>
                              </div>
                            )
                          }
                          {
                            buyKwintal && (
                              <div className="flex-box d-flex justify-content-between align-items-center">
                                <h6>Quantity</h6>
                                <select value={qtKwintal} onChange={(e) => setQtKwintal(e.target.value)}>
                                  {
                                    [...Array(product[0].availableStock.total).keys()].map((x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))
                                  }
                                </select>
                              </div>
                            )
                          }
                          {
                            buyTon && (
                              <div className="flex-box d-flex justify-content-between align-items-center">
                                <h6>Quantity</h6>
                                <select value={qtTon} onChange={(e) => setQtTon(e.target.value)}>
                                  {
                                    [...Array(product[0].availableStock.total).keys()].map((x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))
                                  }
                                </select>
                              </div>
                            )
                          }
                          {
                            userData ?
                              <button onClick={handleAddToCart} className="round-black-btn">Add To Cart</button>
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
                  <strong>Admin Doe</strong>
                  <Rating />
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
          : "Error fetching product data"
      }
    </>
  );
};

export default SingleProduct;
