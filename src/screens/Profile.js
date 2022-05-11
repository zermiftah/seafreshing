import axios from "axios";
import { useState } from "react";
import Notif from '../components/simple';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [notif, setNotif] = useState({
        error: '',
        success: '',
    });
    const userData = JSON.parse(localStorage.getItem('user-data'));

    const validatePassword = (oldPass, newPass) => {
        if (oldPass !== newPass) {
            setNotif({
                error: 'Password doesnt match',
                success: '',
            })
        }
    }

    const updateUser = async (e) => {
        e.preventDefault();
        if (!validatePassword(password, confirmPass)) {
            const qs = require('qs');

            try {
                let response = await axios.patch(`https://server.seafreshing.com/api/user/set-fullname`, qs.stringify({
                    'id': userData.id,
                    'fullname': username,
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': JSON.parse(localStorage.getItem('token')),
                    }
                })
                if (response.data) {
                    try {
                        let response = await axios.patch(`https://server.seafreshing.com/api/user/update-password-user`, qs.stringify({
                            'id': userData.id,
                            'fullname': password,
                        }), {
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token': JSON.parse(localStorage.getItem('token')),
                            }
                        })
                        console.log(response.data)
                    } catch (e) {
                        console.log(e.response.data)
                    }
                }
            } catch (e) {
                if (e.response.data) setNotif({
                    error: 'e.response.data.msg',
                    success: '',
                })
            }
            setNotif({
                error: '',
                success: 'Success',
            })
        }
    }

    return (
        <>
            {
                notif.success && (
                    <Notif title={notif.success} text="Data has been saved!" />
                )
            }
            {
                notif.error && (
                    <Notif title='Error' text={notif.error} />
                )
            }
            <div className="mt-10 sm:mt-0 container px-6 py-3 mx-auto">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                            <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                                <button
                                    type="button"
                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                        <form onSubmit={updateUser}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={userData.fullname}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <input
                                                type="email" placeholder={userData.email} value={email} onChange={(e) => setEmail(e.target.value)}
                                                autoComplete="email"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <input
                                                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
        </>
    )
}
