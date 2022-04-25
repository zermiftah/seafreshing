import React, { useEffect, useState } from "react";
import HeaderHS from "../components/HeaderHS";
import { Link } from "react-router-dom";
import axios from "axios";

const CartScreen = () => {
  window.scrollTo(0, 0);
  const [items, setItems] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const userData = JSON.parse(localStorage.getItem('user-data'));
console.log(userData)
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

  const totalPrice = () => {
    const totPrice = items.reduce((total, item) => {
      return total += (item.product[0].price * item.product[0].productQuantity);
    }, 0);
    return totPrice;
  }

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
                        <select>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                      <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                        <h6>SUBTOTAL</h6>
                        <h4>{item.product[0].price}</h4>
                      </div>
                    </div>
                  ))
                }

                {/* End of cart iterms */}
                <div className="total">
                  <span className="sub">total:</span>
                  <span className="total-price">{`Rp${totalPrice()}`}</span>
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
