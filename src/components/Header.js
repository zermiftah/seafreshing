import logoIcon2 from "../assets/img/Seafreshing.png";
import { FaSearch, FaCartArrowDown, FaRegBell, FaRegEnvelope } from "react-icons/fa";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";


const searchButton = ({
  '@media (min-width : 994px)': {
    form: {
      width: '650px'
    }
  }
})


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
      const response = axios.get(`http://localhost:3001/api/user/get-user/${userData.accounttype}/${userData.id}`, {
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
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-1 mb-2 bg-body rounded">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logoIcon2} alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" >
          <form className="d-flex ms-auto my-2 my-lg-0">
            <input className="form-control me-2" style={{ width: '650px' }} type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-secondary" type="submit"><FaSearch /></button>
          </form>
          <ul className="navbar-nav ms-auto" style={{ textAlign: 'center' }}>
            <li className="nav-item">
              <a className="nav-link fa-lg " href="#"><FaRegBell /></a>
            </li>
            <Link to="/cart">
              <li className="nav-item">
                <a className="nav-link fa-lg" href="#"><FaCartArrowDown /></a>
              </li>
            </Link>
            <li className="nav-item">
              <a className="nav-link fa-lg cyan-text" href="#"><FaRegEnvelope />  |  </a>
            </li>
            <li className="nav-item">
              <Link to="/register"><button type="button" class="btn btn-outline-info me-md-2">Resigter</button></Link>
              <Link to="/login"><button type="button" class="btn btn-outline-info">Log-in</button></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  );
};

export default Header;
