import { FaSearch, FaCartArrowDown, FaRegBell, FaRegEnvelope } from "react-icons/fa";
import React, { useEffect, useState, Fragment } from "react";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { FaBell, FaShoppingCart } from "react-icons/fa";

const HeaderHS = () => {
    const [user, setUser] = useState([]);
    const history = useHistory();
    const userData = JSON.parse(localStorage.getItem('user-data'));
    const [valSearch, setValSearch] = useState('');
    const [getOrders, setOrders] = useState([]);
    const [getWishlist, setWishlist] = useState([]);
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        getUser();
        getOrdersData();
        getWishlistData();
    }, [])

    const getUser = async () => {
        try {
            const response = await axios.get(`https://server.seafreshing.com/api/user/get-user/${userData.accounttype}/${userData.id}`, {
                headers: {
                    'auth-token': JSON.parse(localStorage.getItem('token')),
                }
            })
            setUser(response.data.user)
        } catch (e) {
            console.log(e)
        }
    }

    const getOrdersData = async () => {
        try {
            let response = await axios.get('https://server.seafreshing.com/api/user/get-transaction-test');
            setOrders(response.data)
        } catch (e) {
            console.log(e)
            console.log(e.response.data)
        }
    }

    const getWishlistData = async () => {
        try {
            let response = await axios.get(`https://server.seafreshing.com/api/user/get-wishlist/${userData.accounttype}/${userData.id}`, {
                headers: {
                    'auth-token': token,
                }
            });
            setWishlist(response.data.wishlist[0].wishlist)
            console.log(response.data.wishlist)
        } catch (e) {
            console.log(e)
            console.log(e.response)
        }
    }



    const getValSearch = () => {
        history.push(`/search/${valSearch}`)
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-data');
        history.push('/');
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <nav class="bg-white shadow dark:bg-gray-800">
            <div class="container px-6 py-3 mx-auto">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <a class="text-2xl font-bold text-sky-400 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-sky-700 dark:hover:text-sky-400" href="/HomeScreen">SeaFreshing</a>

                            {/* <!-- Search input on desktop screen --> */}
                            <div class="hidden mx-10 md:block">
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
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
                                    <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
                    <div class="items-center md:flex">
                        <div class="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
                        </div>

                        <div class="flex items-center py-2 -mx-1 md:mx-0">
                            <a

                                className="bg-gray-100 p-1 rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            >
                                <span className="sr-only">View notifications</span>
                                <FaBell className="h-6 w-6" aria-hidden="true" />
                            </a>

                            <a
                                href="/Freezer"
                                className="bg-gray-100 p-1 rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            >
                                <span className="sr-only">View Freezer</span>
                                <FaShoppingCart className="h-6 w-6" aria-hidden="true" />
                            </a>

                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={user.profile}
                                            alt=""
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="/profile"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Your Profile
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="/profile"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Your Kios
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="/wishlist"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Wishlist
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Chat
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    onClick={logout}
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>

                        {/* <!-- Search input on mobile screen --> */}
                        <div class="mt-3 md:hidden">
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </span>

                                <input type="text" class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search" />
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
}

export default HeaderHS;