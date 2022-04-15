import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import axios from 'axios';

const Register = () => {
  const [fullname, setFullName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    let requestId = '';
    const data = new FormData();
    data.append('name', fullname);
    data.append('mobilenumber', mobilenumber);
    data.append('email', email);
    data.append('requestId', requestId);

    try {
      let response = await axios.post('http://localhost:3001/api/user/register', data, {
        header: {
          'Content-Type': 'application/json',
        }
      });
      if (response.data) history.push('/login');
    } catch (e) {
      return e.messages
    }
  }

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <form onSubmit={handleRegister} className="Login col-md-8 col-lg-4 col-11">
          <input type="text" placeholder="Fullname" value={fullname} onChange={(e) => setFullName(e.target.value)} required />
          <input type="text" placeholder="Mobile" value={mobilenumber} onChange={(e) => setMobileNumber(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <button type="submit">Register</button>
          <p>
            <Link to={"/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
