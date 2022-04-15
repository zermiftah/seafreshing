import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import axios from 'axios'

const Login = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notif, setNotif] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    try {
      let response = await axios.post('http://localhost:3001/api/user/login', data, {
        header: {
          'Content-Type': 'application/json',
        }
      })
      if (response.data) history.push('/');
    } catch (e) {
      if (e.response.data.msg) setNotif(e.response.data.msg);
    }
  }

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {
          notif && (
            <div className="alert alert-danger" role="alert">
              {notif}
            </div>
          )
        }
        <form onSubmit={handleLogin} className="Login col-md-8 col-lg-4 col-11">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
          <p>
            <Link to={"/register"}>Create Account</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
