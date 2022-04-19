import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logoIcon from "../assets/img/favicon.png"
import style from "./Carousel/CarouselContainer.module.css"

const Header = () => {
  const cartCounter = JSON.parse(localStorage.getItem('cart-counter'));
  const [user, setUser] = useState([]);
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('user-data'));

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    try {
      const response = axios.get(`http://103.102.152.201:3001/api/user/get-user/${userData.accounttype}/${userData.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': JSON.parse(localStorage.getItem('token')),
        }
      });
      // console.log(response.data)
      setUser(response.data)
    } catch (e) {
      // console.log(e.response.data.msg)
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user-data');
    history.push('/login');
  }

  return (
    <div>
      {/* Top Header */}
      {/* <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+255 768 356 890</p>
              <p>info@seafresh.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      {/* Header */}

      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src={logoIcon} />
                  </Link>
                </div>
                {
                  userData ?
                    <>
                      <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="name-button dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fas fa-user"></i>
                          </button>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/profile">
                              Profile
                            </Link>
                            <Link onClick={logout} className="dropdown-item" to="#">
                              Logout
                            </Link>
                          </div>
                        </div>
                        <Link to="/cart" className="cart-mobile-icon">
                          <i className="fas fa-shopping-bag"></i>
                          {
                            cartCounter > 0 ?
                              <span className="badge">{cartCounter}</span>
                              : ""
                          }
                        </Link>
                      </div>
                    </>
                    :
                    <>
                      <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                        <div className="btn-group">
                          <Link className="name-button" to='/login'><i className="fas fa-sign-in"></i></Link>
                          <Link className="name-button" to='/register'><i className="fas fa-user-plus"></i></Link>
                        </div>
                      </div>
                    </>
                }
                <div className="col-12 d-flex align-items-center">
                  <form className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}

          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src={logoIcon} />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                  />
                  <button type="submit" className="search-button">
                    search
                  </button>
                </form>
              </div>
              {
                userData ?
                  <>
                    <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="name-button dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {`Hi ${userData.fullname}`}
                        </button>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/profile">
                            Profile
                          </Link>

                          <Link onClick={logout} className="dropdown-item" to="#">
                            Logout
                          </Link>
                        </div>
                      </div>

                      <Link to="/cart">
                        <i className="fas fa-shopping-bag"></i>
                        {
                          cartCounter > 0 ?
                            <span className="badge">{cartCounter}</span>
                            : ""
                        }
                      </Link>
                    </div>
                  </>
                  :
                  <>
                    <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                      <div className="btn-group">
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                      </div>
                    </div>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
