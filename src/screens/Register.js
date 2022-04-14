import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";

const Register = () => {

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11">
          <input type="text" placeholder="Fullname" />
          <input type="mobilenumber" placeholder="Mobile" />
          <input type="city" placeholder="City" />
          <input type="country" placeholder="Country" />
          <input type="password" placeholder="Password" />
          <input type="zipcode" placeholder="Zip Code" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

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
