import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [valSearch, setValSearch] = useState('');
  const history = useHistory();

  const getValSearch = () => {
    history.push(`/search/${valSearch}`)
  }

  return (
    // <Fragment>
    //   <nav class="py-1 bg-light border-bottom">
    //     <div class="container d-flex flex-wrap">
    //       <ul class="nav me-auto">
    //         <li class="nav-item"><a href="#" class="nav-link link-dark px-2 active" aria-current="page">Download App</a></li>
    //       </ul>
    //     </div>
    //   </nav>
    //   <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-1 mb-2 bg-body rounded">
    //     <div className="container">
    //       <Link className="navbar-brand" to="/">
    //         <img src={logoIcon2} alt="" />
    //       </Link>
    //       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarNav" >
    //         <form onSubmit={getValSearch} className="d-flex ms-auto my-2 my-lg-0">
    //           <input value={valSearch} onChange={(e) => setValSearch(e.target.value)} className="form-control me-2" style={{ width: '650px' }} type="search" placeholder="Search" aria-label="Search" />
    //           <button className="btn btn-secondary" type="submit"><FaSearch /></button>
    //         </form>
    //         <ul className="navbar-nav ms-auto" style={{ textAlign: 'center' }}>
    //           <Link to="/login">
    //             <li className="nav-item">
    //               <a className="nav-link fa-lg " href="#"><FaRegBell /></a>
    //             </li>
    //           </Link>
    //           <Link to="/login">
    //             <li className="nav-item">
    //               <a className="nav-link fa-lg" href="#"><FaCartArrowDown /></a>
    //             </li>
    //           </Link>
    //           <Link to="/login">
    //             <li className="nav-item">
    //               <a className="nav-link fa-lg cyan-text" href="#"><FaRegEnvelope />  |  </a>
    //             </li>
    //           </Link>
    //           <li className="nav-item">
    //             <Link to="/register"><button type="button" class="btn btn-outline-info me-md-2">Resigter</button></Link>
    //             <Link to="/login"><button type="button" class="btn btn-outline-info">Log-in</button></Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav >
    // </Fragment>
    <nav class="bg-white shadow dark:bg-gray-800">
      <div class="container px-6 py-3 mx-auto">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Link to="/">
                <a class="text-2xl font-bold text-sky-400 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-sky-700 dark:hover:text-sky-400" href="#">SeaFreshing</a>
              </Link>
              {/* <!-- Search input on desktop screen --> */}
              <div class="hidden mx-10 md:block">
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>

                  <input type="text" class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search" />
                </div>
              </div>
            </div>

            {/* <!-- Mobile menu button --> */}
            <div class="flex md:hidden">
              <button type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
          <div class="items-center md:flex">
            <div class="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
              {/* <a class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0" href="#">Home</a>
                        <a class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0" href="#">Blog</a>
                        <a class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0" href="#">Compoents</a>
                        <a class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0" href="#">Courses</a> */}
            </div>

            <div class="flex items-center py-2 -mx-1 md:mx-0">
              <Link class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-blue-600 md:mx-2 md:w-auto" to="/login">
                <a>Sign In</a>
              </Link>
              <Link class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 md:mx-0 md:w-auto" to="/register">
                <a>Sign Up</a>
              </Link>
            </div>

            {/* <!-- Search input on mobile screen --> */}
            <div class="mt-3 md:hidden">
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <form onSubmit={getValSearch}>
                  <input type="search" value={valSearch} onChange={(e) => setValSearch(e.target.value)} class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search" />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="py-3 mt-3 -mx-3 overflow-y-auto whitespace-nowrap scroll-hidden">
          <a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="#">Download App</a>
          <a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="#">Privacy Policy</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
