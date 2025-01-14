import axios from "axios";
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    CogIcon,
    ShoppingBagIcon,
    TagIcon,
    MenuIcon,
    XIcon,
} from '@heroicons/react/outline'
import Seafreshing from "../../assets/img/Seafreshing.png"

const navigation = [
    { name: 'Kiosk', href: '/kiosk', icon: ShoppingBagIcon, current: false },
    { name: 'Order Purchase', href: '/kiosk', icon: TagIcon, current: false },
    { name: 'Settings', href: '', icon: CogIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfileSidebar() {
    const [user, setUser] = useState([]);
    const userData = JSON.parse(localStorage.getItem('user-data'));
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            const response = await axios.get(`https://server.seafreshing.com/api/user/get-user/${userData.accounttype}/${userData.id}`, {
                headers: {
                    'auth-token': JSON.parse(localStorage.getItem('token')),
                }
            })
            setUser(response.data.user)
            console.log(user)
        } catch (e) {
            console.log(e)
        }
    }

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                    <div className="flex-shrink-0 flex items-center px-4">
                                        <a href="/">
                                            <img
                                                className="h-8 w-auto"
                                                src={Seafreshing}
                                                alt="Seafreshing"
                                            />
                                        </a>
                                    </div>
                                    <nav className="mt-5 px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                        'mr-4 flex-shrink-0 h-6 w-6'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                                    <a href="/profile" className="flex-shrink-0 group block">
                                        <div className="flex items-center">
                                            <div>
                                                <img
                                                    className="inline-block h-10 w-10 rounded-full"
                                                    src={user.profile}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.fullname}</p>
                                                <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14"></div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-slate-200">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4">
                                <a href="/">
                                    <img
                                        className="px-8 h-10 w-auto"
                                        src={Seafreshing}
                                        alt="Seafreshing"
                                    />
                                </a>
                            </div>
                            <nav className="mt-5 flex-1 px-2 bg-salte-200 space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <a href="/profile" className="flex-shrink-0 w-full group block">
                                <div className="flex items-center">
                                    <div>
                                        <img
                                            className="inline-block h-9 w-9 rounded-full"
                                            src={user.profile}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.fullname}</p>
                                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
                        <button
                            type="button"
                            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
