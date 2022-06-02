

import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Menu, Popover, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { BellIcon, ShoppingCartIcon, MenuIcon, XIcon, DeviceMobileIcon } from '@heroicons/react/outline'
import Seafreshing from "../assets/img/Seafreshing.png"


const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'KiosK', href: '/kiosk' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [user, setUser] = useState([]);
    const history = useHistory();
    const userData = JSON.parse(localStorage.getItem('user-data'));
    const [valSearch, setValSearch] = useState('');

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            const response = await axios.get(`https://server.seafreshing.com/api/user/get-user/${userData.accounttype}/${userData.id}`, {
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
        history.push('/');
    }
    return (
        <>
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
            <Popover
                as="header"
                className={({ open }) =>
                    classNames(
                        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                        'bg-slate-200 shadow-sm lg:static lg:overflow-y-visible'
                    )
                }
            >
                {({ open }) => (
                    <>
                        <div className="bg-gray-900">
                            <div className="max-w-8xl mx-auto h-8 px-4 flex items-center justify-between sm:px-6 lg:px-8">
                                {/* Currency selector */}
                                <div className="flex items-center space-x-2">
                                    <a href="#" className="text-xs font-small text-white hover:text-gray-100">
                                        <DeviceMobileIcon className="bg-gray-900 h-5" />
                                    </a>
                                    <a href="#" className="text-xs font-small text-white hover:text-gray-100">
                                        Download Seafreshing App
                                    </a>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <a href="#" className="text-xs font-small text-white hover:text-gray-100">
                                        Tentang Seafreshing
                                    </a>
                                    <a href="#" className="text-xs font-medium text-white hover:text-gray-100">
                                        Mitra Seafreshing
                                    </a>
                                    <a href="#" className="text-xs font-medium text-white hover:text-gray-100">
                                        Promo
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                                    <div className="flex-shrink-0 flex items-center">
                                        <a href="#">
                                            <img
                                                className="block h-8 w-auto"
                                                src={Seafreshing}
                                                alt="seafreshing"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                                    <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                                        <div className="w-full">
                                            <label htmlFor="search" className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <form onSubmit={getValSearch}>
                                                    <input
                                                        value={valSearch} onChange={(e) => setValSearch(e.target.value)}
                                                        id="search"
                                                        name="search"
                                                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                                                        placeholder="Search"
                                                        type="search"
                                                    />
                                                    <button type='submit' hidden></button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                                    {/* Mobile menu button */}
                                    <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Open menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Popover.Button>
                                </div>
                                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                                    <a
                                        href="#"
                                        className=" flex-shrink-0 bg-slate-200 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="bg-slate-200 h-6 w-6" aria-hidden="true" />
                                    </a>
                                    <a
                                        href="/freezer"
                                        className="ml-2 flex-shrink-0 bg-slate-200 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                                    >
                                        <span className="sr-only">View Freezer</span>
                                        <ShoppingCartIcon className="bg-slate-200 h-6 w-6" aria-hidden="true" />
                                    </a>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="flex-shrink-0 relative ml-3">
                                        <div>
                                            <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800">
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full" src={user.profile} alt="" />
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
                                            <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block py-2 px-4 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>


                                </div>
                            </div>
                        </div>

                        <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                            <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                            </div>
                            <div className="border-t border-gray-200 pt-4 pb-3">
                                <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.profile} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{user.fullname}</div>
                                        <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                                    <a
                                        key=""
                                        href=""
                                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        Notification
                                    </a>
                                    <a
                                        key=""
                                        href=""
                                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        Freezer
                                    </a>
                                    {userNavigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </>
    )
}
