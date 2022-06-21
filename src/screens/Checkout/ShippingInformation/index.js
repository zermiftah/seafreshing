import React, { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import classNames from '../modules';
import { CheckCircleIcon } from '@heroicons/react/solid';
import axios from 'axios'
const ShippingInformation = ({
    listMethod = [],
    selectedDeliveryMethod,
    setSelectedDeliveryMethod = () => { },
    onChangeTypeVehicle,
    onChangeAddress,
    freezerChoosen,
}) => {

    let id = JSON.parse(localStorage.getItem('user-data'));

    let products = [], packages = [], packs = [], content = [], url = "";


    const [data, setData] = useState()

    let kioskData = [], objItem = {}



    useEffect(() => {

        axios({
            method: "get",
            url: `https://server.seafreshing.com/api/user/get-user/0/${id.id}`,
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('token'))
            }
        }).then(r => {
            const userResponse = r.data.user
            localStorage.setItem('data-in-checkout', JSON.stringify(r.data.user))
            setData(userResponse)
            getUser(userResponse.accountype, userResponse.id);
            getAddress(userResponse.id);
            for (let i = 0; i < userResponse.freezer.length; i++) {
                let element = userResponse.freezer[i]

                axios({
                    method: "get",
                    url: `https://server.seafreshing.com/api/kiosk/get-kiosk/${element.id}`,
                }).then(r => {
                    // create content from here while searching for address of kiosk
                    objItem.destination = {
                        "fullAddress": userResponse.address[0].fullAddress + " " + userResponse.address[0].district + " " + userResponse.address[0].city + " " + userResponse.address[0].province + ", " + userResponse.address[0].zipCode,
                        "latitude": userResponse.address[0].lat,
                        "longitude": userResponse.address[0].lng,
                        "name": userResponse.fullname + " - " + userResponse.address[0].label
                    }
                    objItem.kioskDetails = {
                        "id": r.data.kiosk.id,
                        "kioskPhone": r.data.kiosk.mobileNumber,
                        "name": r.data.kiosk.name
                    }
                    objItem.origin = {
                        "fullAddress": r.data.kiosk.fullAddress,
                        "latitude": r.data.kiosk.lat,
                        "longitude": r.data.kiosk.lng,
                        "name": r.data.kiosk.name
                    }
                    objItem.product = element.product
                    objItem.shipping = {
                        "cost": selectedDeliveryMethod.clear,
                        "service": selectedDeliveryMethod.id,
                        "status": "",
                        "trackUrl": ""
                    }
                    objItem.status = "PENDING"

                    kioskData.push(objItem)
                    localStorage.setItem('data-kiosk', JSON.stringify(kioskData))
                    // lala(r.data.kiosk)


                    // console.log(grabPrice, "grab rpice")
                })

                element.product.map(e => {
                    products.push({
                        id: e.id,
                        kiosk: e.kioskId,
                        name: e.name,
                        description: e.name,
                        dimensions: {
                            "height": 0,
                            "width": 0,
                            "depth": 0,
                            "weight": e.productQuantity
                        },
                        price: e.totalPrice ? `Rp. ${e.totalPrice}, -` : `Rp. 0,-`,
                        clear: e.totalPrice ? e.totalPrice : 0,
                        imageSrc: e.image,
                        href: "#",
                        qty: e.productQuantity ? e.productQuantity : 0
                    })
                    packages.push({
                        "name": e.name,
                        "description": e.name,
                        "quantity": e.productQuantity,
                        "price": e.totalPrice,
                        "dimensions": {
                            "height": 0,
                            "width": 0,
                            "depth": 0,
                            "weight": e.productQuantity
                        }
                    })
                    packs.push({
                        "dimensions": [0, 0, 0],
                        "weight": e.productQuantity,
                        "quantity": e.productQuantity
                    })
                })
            }
        })
    }, [])


    const [address, setAddress] = useState([]);
    const [user, setUser] = useState([]);

    const getUser = async (accountype, id) => {
        try {
            const response = await axios.get(`https://server.seafreshing.com/api/user/get-user/${accountype}/${id}`, {
                headers: {
                    'auth-token': JSON.parse(localStorage.getItem('token')),
                }
            })
            setUser(response.data.user)

        } catch (e) {
            console.log(e)
        }
    }


    const [selectedAddressz, setSelectedAddress] = useState(address);
    const getAddress = async (id) => {
        try {
            const data = await axios.get(`https://server.seafreshing.com/api/user/get-address/${id}`)
            let temp = data.data.address.address;
            setAddress(temp)
            setSelectedAddress(temp[0])

        } catch (e) {

        }
    }



    return (
        <>
            <div>
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <a href='/addaddressform'>
                            <button
                                type="button"
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-slate-200 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                            >
                                Add Address
                            </button>
                        </a>
                    </div>
                </div>
                <RadioGroup value={selectedAddressz
                } onChange={value => {
                    setSelectedAddress(value)
                    onChangeAddress(value)
                }}>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {address.map((data) => (
                            <RadioGroup.Option
                                key={data.id}
                                value={data}
                                className={({ checked, active }) =>
                                    classNames(
                                        checked ? 'border-transparent' : 'border-gray-300',
                                        active ? 'ring-2 ring-slate-800' : '',
                                        'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                    )
                                }
                            >
                                {({ checked, active }) => (

                                    <>
                                        <div className="flex-1 flex">
                                            <div className="flex flex-col">
                                                <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900" >
                                                    {data.label}
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className="mt-1 flex items-center text-sm text-gray-500"
                                                >
                                                    {data.fullAddress}
                                                </RadioGroup.Description>
                                                <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900" >
                                                    {data.mobileNumber}
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        {checked ? (<CheckCircleIcon className="h-5 w-5 text-slate-800" aria-hidden="true" />) : null}
                                        <div
                                            className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked ? 'border-slate-800' : 'border-transparent',
                                                'absolute -inset-px rounded-lg pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
                <div className=" grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">

                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Fullname
                        </label>
                        <div className="mt-1">{data?.fullname}</div>
                    </div>


                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">{data?.email}</div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <div className="mt-1">
                            {selectedAddressz?.fullAddress} <p> </p>
                            {selectedAddressz?.district}<p> </p>
                            {selectedAddressz?.city}<p> </p>
                            {selectedAddressz?.province}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                            Postal code
                        </label>
                        <div className="mt-1">{selectedAddressz.zipCode}</div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <div className="mt-1">{selectedAddressz?.mobileNumber}</div>
                    </div>
                </div>
            </div>

        </>

    );

}

export default ShippingInformation;
