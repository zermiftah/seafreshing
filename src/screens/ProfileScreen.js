import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderHS from "../components/HeaderHS";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Wishlist from "../components/profileComponents/Wishlist";
import Orders from "./../components/profileComponents/Orders";
import { FaStore } from "react-icons/fa";
import Kiosk from "../components/profileComponents/Kiosk";

const ProfileScreen = () => {
  window.scrollTo(0, 0);

  const [user, setUser] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user-data'));
  const [getOrders, setOrders] = useState([]);
  const [getWishlist, setWishlist] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    getUser();
    getOrdersData();
    getWishlistData();
  }, [])

  const getUser = async () => {
    try {
      const response = await axios.get(`https://server.seafreshing.com/api/user/get-user/${userData.accounttype}/${userData.id}`, {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('token')),
        }
      })
      setUser(response.data.user)
    } catch (e) {
      console.log(e)
    }
  }

  const getOrdersData = async () => {
    try {
      let response = await axios.get('https://server.seafreshing.com/api/user/get-transaction-test');
      setOrders(response.data)
    } catch (e) {
      console.log(e)
      console.log(e.response.data)
    }
  }

  const getWishlistData = async () => {
    try {
      let response = await axios.get(`https://server.seafreshing.com/api/user/get-wishlist/${userData.accounttype}/${userData.id}`, {
        headers: {
          'auth-token': token,
        }
      });
      setWishlist(response.data.wishlist[0].wishlist)
      console.log(response.data.wishlist)
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }

  return (
    <>
      <HeaderHS />
      <div className="container mt-lg-5 mt-3 mb-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img src={user.profile} alt="userprofileimage" />
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>{user.fullname}</strong>
                  </h5>
                  <span className="author-card-position">
                    <>Joined Dec 12 2021</>
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-info">
              <div className="d-flex justify-content-start align-items-center gap-2 mb-3">
                <span><FaStore /></span>
                <span><strong>Kiosk</strong></span>
              </div>
              <div className="text-center">
                <h5>Earn extra income</h5>
                <p>Create a kiosk and start selling on Seafreshing to earn income.</p>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div className="d-flex align-items-start">
                <div
                  className="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link"
                    id="v-pills-kiosk-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-kiosk"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-kiosk"
                    aria-selected="false"
                  >
                    Open Kiosk
                  </button>
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="false"
                  >
                    Profile Settings
                  </button>
                  <button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Orders List
                    {
                      getOrders.length === 0 ?
                        null
                        :
                        <span className="badge2">{getOrders.length}</span>
                    }
                  </button>
                  <button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-wishlist-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-wishlist"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-wishlist"
                    aria-selected="false"
                  >
                    Wishlist
                    {
                      getWishlist.length === 0 ?
                        null
                        :
                        <span className="badge2">{getWishlist.length}</span>
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div
            className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade"
              id="v-pills-kiosk"
              role="tabpanel"
              aria-labelledby="v-pills-kiosk-tab"
            >
              <Kiosk />
            </div>
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs userData={user} />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders orderList={getOrders} />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-wishlist"
              role="tabpanel"
              aria-labelledby="v-pills-wishlist-tab"
            >
              <Wishlist getWishlist={getWishlist} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
