import React, { useEffect, useState } from "react";
import HeaderHS from "../components/HeaderHS";
import { Link } from "react-router-dom";
import axios from "axios";

const CartScreen = () => {
  window.scrollTo(0, 0);
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const token = JSON.parse(localStorage.getItem('token'));
  const userData = JSON.parse(localStorage.getItem('user-data'));
  console.log(items)
  useEffect(() => {
    getFreezer();
  }, [])

  const getFreezer = async () => {
    try {
      let response = await axios.get(`http://103.102.152.201:3001/api/user/get-freezer/${userData.id}`, {
        headers: {
          'auth-token': token,
        }
      });
      setItems(response.data.freezer);
    } catch (e) {
      console.log(e)
    }
  }

  const totPrice = items.reduce((total, item) => {
    total += (item.product[0].clearPrice)
    return total;
  }, 0);

  const removeItem = async (freezerId, productId) => {
    try {
      let response = await axios.delete('http://103.102.152.201:3001/api/user/delete-freezer', {
        headers: {
          'auth-token': token,
        }
      }, {
        'id': userData.id,
        "freezer.id": freezerId,
        'productId': productId,

      });
      console.log(response.data)
    } catch (e) {
      console.log(e)
      console.log(e.response.data)
    }
  }

  return (
    <>
      <HeaderHS />
      {/* Cart */}
      <div className="container">
        {
          items ?
            items.length === 0 ?
              <div className=" alert alert-info text-center mt-3">
                Your cart is empty
                <Link
                  className="btn btn-success mx-5 px-5 py-3"
                  to="/"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  SHOPPING NOW
                </Link>
              </div>
              :
              <>
                <div className=" alert alert-info text-center mt-3">
                  Total Cart Products
                  <Link className="text-success mx-2" to="/cart">
                    {items.length}
                  </Link>
                </div>
                {/* cartiterm */}
                {
                  items.map((item) => (
                    <>
                      {
                        item.kioskName && item.product.length !== 0 ?
                          item.product.map(product => (
                            <div className="cart-iterm row" key={product.id}>
                              <div onClick={() => removeItem(product.id, product.id)} className="remove-button d-flex justify-content-center align-items-center">
                                <i className="fas fa-times"></i>
                              </div>
                              <div className="cart-image col-md-3">
                                <img src={product.image} alt={product.name} />
                              </div>
                              <div className="cart-text col-md-5 d-flex align-items-center">
                                <Link to="#">
                                  <h4>{product.name}</h4>
                                </Link>
                              </div>
                              <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                                <h6>QUANTITY</h6>
                                <select onChange={(e) => setQuantity(e.target.value)}>
                                  {
                                    <option value={product.productQuantity}>
                                      {product.productQuantity}
                                    </option>
                                  }
                                </select>
                              </div>
                              <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                                <h6>SUBTOTAL</h6>
                                <h4>{`Rp. ${product.clearPrice * product.productQuantity}`}</h4>
                              </div>
                            </div>
                          ))
                          :
                          <div className="cart-iterm row" key={item.id}>
                            <div onClick={() => removeItem(item.id, item.product[0].id)} className="remove-button d-flex justify-content-center align-items-center">
                              <i className="fas fa-times"></i>
                            </div>
                            <div className="cart-image col-md-3">
                              <img src={item.product[0].image} alt={item.product[0].name} />
                            </div>
                            <div className="cart-text col-md-5 d-flex align-items-center">
                              <Link to="#">
                                <h4>{item.product[0].name}</h4>
                              </Link>
                            </div>
                            <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                              <h6>QUANTITY</h6>
                              <select onChange={(e) => setQuantity(e.target.value)}>
                                {
                                  <option value={item.product[0].productQuantity}>
                                    {item.product[0].productQuantity}
                                  </option>
                                }
                              </select>
                            </div>
                            <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                              <h6>SUBTOTAL</h6>
                              <h4>{`Rp. ${item.product[0].clearPrice * item.product[0].productQuantity}`}</h4>
                            </div>
                          </div>
                      }
                    </>
                  ))
                }

                {/* End of cart iterms */}
                <div className="total">
                  <span className="sub">total:</span>
                  <span className="total-price">{`Rp ${totPrice}`}</span>
                </div>
                <hr />
                <div className="cart-buttons d-flex align-items-center row">
                  <Link to="/" className="col-md-6 ">
                    <button>Continue To Shopping</button>
                  </Link>
                  <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                    <button>
                      <Link to="/shipping" className="text-white">
                        Checkout
                      </Link>
                    </button>
                  </div>
                </div>
              </>
            :
            "Loading..."
        }
      </div>
    </>
  );
};

export default CartScreen;
