import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import axios from 'axios';
import Notif from '../components/simple'
import { version } from "react-dom";

function randomStr(len, arr) {
  var ans = '';
  for (var i = len; i > 0; i--) {
    ans +=
      arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
}

const Register = () => {
  const [fullname, setFullName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notif, setNotif] = useState('');
  const [requestId, setRequestId] = useState('');
  const [otpVer, setOTPver] = useState({});


  const handleRegister = async (e) => {
    setRequestId(randomStr(20, '12345abcde'))
    const otp = {
      fullname: fullname,
      mobilenumber: mobilenumber,
      email: email,
      password: password,
      requestId: requestId
    }
    setOTPver(otp);
    localStorage.setItem('otpVer', JSON.stringify(otpVer));

    e.preventDefault();
    let qs = require('qs');


    try {
      let response = await axios.post('https://server.seafreshing.com/api/user/register', qs.stringify({
        'name': fullname,
        'mobilenumber': mobilenumber,
        'email': email,
        'requestId': requestId,
      }), {
        header: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response)
      if (response.data) {

        setNotif(response.data.msg)
        await axios.post(
          'https://server.seafreshing.com/api/user/send-verify-email',
          qs.stringify(
            {
              'nameUser': fullname,
              'id': Math.random().toString(36).slice(2),
              'email': email,
              'requestId': requestId
            }
          )
        )
        setRequestId("")
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
                <form onSubmit={handleRegister} >
                  <div>
                    <label for="fullname" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                    <input type="text" name="fullname" id="fullname" placeholder="Your Name" value={fullname} onChange={(e) => setFullName(e.target.value)} required class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>

                  <div class="mt-6">
                    <div class="flex justify-between mb-2">
                      <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Mobile Number</label>
                    </div>

                    <input type="text" value={mobilenumber} onChange={(e) => setMobileNumber(e.target.value)} required name="mobilenumber" id="mobilnumber" placeholder="Your Mobile Number" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>

                  <div class="mt-6">
                    <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required name="email" id="email" placeholder="example@example.com" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>



                  <div class="mt-6">
                    <div class="flex justify-between mb-2">
                      <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Password</label>
                    </div>

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required name="password" id="password" placeholder="Your Password" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>


                  <div class="mt-6">
                    <Link to="./otp-verify"
                    >
                      <button type="submit"
                        class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Sign up
                      </button>
                    </Link>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Register;
