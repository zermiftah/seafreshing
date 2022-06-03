import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Notif from '../components/simple';
import headers from "../components/HeaderHS"

export default function Profile() {
    const [user, setUser] = useState([]);
    const [img, setImg] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [notif, setNotif] = useState({
        error: '',
        success: '',
    });
    const userData = JSON.parse(localStorage.getItem('user-data'));
    const imgFile = useRef('');
    const qs = require('qs');

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
        } catch (e) {
            console.log(e)
        }
    }

    const getImg = () => {
        imgFile.current.click();
    }

    const handleUpload = async () => {
        if (img) {
            let data = new FormData();
            data.append('file', img);

            try {
                let response = await axios.post('https://server.seafreshing.com/api/file-uploader/upload-profile-picture', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'auth-token': JSON.parse(localStorage.getItem('token')),
                    }
                })
                if (response.data) {
                    try {
                        let res = await axios.patch('https://server.seafreshing.com/api/user/set-profile-picture', {
                            'id': userData.id,
                            'url': response.data.filePath,
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token': JSON.parse(localStorage.getItem('token')),
                            }
                        })
                        if (res.data) {
                            setNotif({
                                'error': '',
                                'Success': 'Profile picture has been changed'
                            })
                        }
                    } catch (e) {
                        console.log(e.res.data)
                    }
                }
            } catch (e) {
                setNotif({
                    'error': 'File is too large',
                    'Success': ''
                })
                console.log(e)
                console.log(e.response)
                console.log(e.response.data)
            }
        } else {
            setNotif({
                'error': "Photo is not found",
                'success': ''
            })
        }
    }

    const validatePassword = (oldPass, newPass) => {
        if (oldPass !== newPass) {
            setNotif({
                error: 'Password doesnt match',
                success: '',
            })
        }
    }

    console.log(img)

    const updateUser = async (e) => {
        e.preventDefault();
        if (!validatePassword(password, confirmPass)) {
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
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={updateUser}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={userData.fullname}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-slate-800 focus:border-slate-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Full Adress
                                            </label>
                                            <input
                                                type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)}
                                                autoComplete="email"
                                                className="mt-1 focus:ring-slate-800 focus:border-slate-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Label
                                            </label>
                                            <input
                                                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Office/ Home / "
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-slate-800 focus:border-slate-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-slate-800 focus:border-slate-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Province
                                            </label>
                                            <input
                                                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                                placeholder=""
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-slate-800 focus:border-slate-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                City
                                            </label>
                                            <input
                                                type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-slate-800 focus:border-slate-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                District
                                            </label>
                                            <input
                                                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                                placeholder=""
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-slate-800 focus:border-slate-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Subdistrict
                                            </label>
                                            <input
                                                type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-slate-800 focus:border-slate-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Zip Code
                                            </label>
                                            <input
                                                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                                placeholder=""
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-slate-800 focus:border-slate-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>



                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-slate-200 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
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
