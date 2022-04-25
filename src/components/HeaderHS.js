import { FaSearch, FaCartArrowDown, FaRegBell, FaRegEnvelope } from "react-icons/fa";
import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import logoIcon2 from "../assets/img/Seafreshing.png";

const HeaderHS = () => {
    const [user, setUser] = useState([]);
    const history = useHistory();
    const userData = JSON.parse(localStorage.getItem('user-data'));
    const [valSearch, setValSearch] = useState('');

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            const response = await axios.get(`http://103.102.152.201:3001/api/user/get-user/${userData.accounttype}/${userData.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': JSON.parse(localStorage.getItem('token')),
                }
            });
            setUser(response.data.user)
        } catch (e) {
            return e
        }
    }

    const getValSearch = () => {
        history.push(`/search/${valSearch}`)
    }
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-data');
        history.push('/login');
    }

    return (
        <Fragment>
            <nav class="py-1 bg-light border-bottom">
                <div class="container d-flex flex-wrap">
                    <ul class="nav me-auto">
                        <li class="nav-item"><a href="#" class="nav-link link-dark px-2 active" aria-current="page">Download App</a></li>
                    </ul>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-1 mb-2 bg-body rounded">
                <div className="container">
                    <Link className="navbar-brand" to="/HomeScreen">
                        <img src={logoIcon2} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" >
                        <form onSubmit={getValSearch} className="d-flex ms-auto my-2 my-lg-0">
                            <input value={valSearch} onChange={(e) => setValSearch(e.target.value)} className="form-control me-2" style={{ width: '650px' }} type="search" placeholder="Search" aria-label="Search" />
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
                            <div class="flex-shrink-0 dropdown">
                                <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={user.profile} alt="mdo" width="32" height="32" class="rounded-circle" />
                                </a>
                                <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                    <Link to="/profile" className="dropdown-item">
                                        <li><a>Profile</a></li>
                                    </Link>
                                    <Link onClick={logout} className="dropdown-item" to="/">
                                        <li><a>Sign out</a></li>
                                    </Link>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav >
        </Fragment>
    );
}

export default HeaderHS;