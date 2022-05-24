import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import axios from 'axios';
import Notif from '../components/simple'

const OtpScreen = (props) => {
  const [otp, setOtp] = useState(''),
    [requestId, setRequestId] = useState(''),
    [email, setEmail] = useState(''),
    [id, setId] = useState(''),
    [notif, setNotif] = useState('');
  const [fullname, setFullName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [otpVer, setOTPver] = useState({});


  useEffect(() => {
    const otpVer = JSON.parse(localStorage.getItem('otpVer'));
    if (otpVer) {
      setOTPver(otpVer);
    }
  }, []);

  console.log(otpVer)


  const handleOtpVerification = async (e) => {
    e.preventDefault();
    let qs = require('qs');

    try {
      let response = await axios.post('https://server.seafreshing.com/api/user//verify-email-code', qs.stringify({
        "code": otp,
        "requestId": requestId,
        "email": email,
        "id": id
      }));

      if (response.data) {
        setNotif(response.data.msg)
        await axios.post(
          'https://server.seafreshing.com/api/user/create-account',
          qs.stringify(
            {
              "id": id,
              "state": state,
              "name": fullname,
              "password": password,
              "email": email,
              "mobilenumber": mobilenumber,
              "accounttype": 0
            }
          )
        )
      }
    } catch (e) {
      console.log(e.response.data)
    }
  }



  return (
    <>
      {
        notif && (
          <Notif title="Register" text={notif} />
        )
      }
      <div class="bg-white dark:bg-gray-900">
        <div class="flex justify-center h-screen">
          <div class="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: `url(https://img.freepik.com/free-photo/top-view-variety-fresh-fish-seafood-ice-with-copy-apace_126277-771.jpg?w=1060)` }}>
            <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 class="text-4xl font-bold text-white">Seafreshing</h2>

                <p class="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
              </div>
            </div>
          </div>

          <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div class="flex-1">
              <div class="text-center">
                <h2 class="text-4xl font-bold text-center text-sky-400 dark:text-white">Seafreshing</h2>

                <p class="mt-3 text-gray-500 dark:text-gray-300">Sign up to access your account</p>
              </div>

              <div class="mt-8">
                <form onSubmit={handleOtpVerification}>
                  <div>
                    <label for="otp" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                    <input type="text" name="otp" id="otp" placeholder="Input your OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>


                  <div class="mt-6">
                    <button type="submit"
                      class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign up
                    </button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpScreen;
