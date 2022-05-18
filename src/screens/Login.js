import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import axios from 'axios'
import Notif from '../components/simple'

const Login = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notif, setNotif] = useState({
    error: '',
    success: '',
  });
  const history = useHistory();
  const [show, setShow] = useState(true)
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const qs = require('qs');
    let data = new FormData();
    data.append('id', email);
    data.append('password', password);

    try {
      let response = await axios.post('https://server.seafreshing.com/api/user/login', data)
      if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('user-data', JSON.stringify(response.data.user))
        setNotif({
          error: '',
          success: response.data.msg,
        })
      }
      setTimeout(() => {
        history.push('/HomeScreen')
      }, 3000)
    } catch (e) {
      if (e.response.data.msg) setNotif({
        error: e.response.data.msg,
        success: '',
      });
    }
  }

  return (
    <>
      {
        notif.success && (
          <Notif show={show} close={() => setShow(false)} title={notif.success} text="Redirect..." />
        )
      }
      {
        notif.error && (
          <Notif show={show} close={() => setShow(false)} title='Error' text={notif.error} />
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

                <p class="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
              </div>

              <div class="mt-8">
                <form onSubmit={handleLogin}>
                  <div>
                    <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="example@example.com" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div class="mt-6">
                    <div class="flex justify-between mb-2">
                      <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Password</label>
                      <a href="#" class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                    </div>

                    <input type="password" name="password" id="password" placeholder="Your Password" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>

                  <div class="mt-6">
                    <button type="submit"
                      class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>

                </form>

                <p class="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <Link className="text-blue-500 focus:outline-none focus:underline hover:underline" to={"/register"}>Sign up</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
