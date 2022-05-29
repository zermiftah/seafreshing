import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { parse } from 'qs';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [grabPrice, setGrabPrice] = useState(0),
        [delivereePrice, setDelivereePrice] = useState(0),
        [lalamovePrice, setLalamovePrice] = useState(0)


    const deliveryMethods = [
        { id: 'lalamove', title: 'Lalamove', turnaround: '1 - 2 business days', price: `Rp.${lalamovePrice}`, clear: lalamovePrice },
        { id: 'grab_express', title: 'GrabExpress', turnaround: '1 - 2 business days', price: `Rp.${grabPrice}`, clear: grabPrice },
        { id: 'deliveree', title: 'Deliveree', turnaround: '1 - 2 business days', price: `Rp.${delivereePrice}`, clear: delivereePrice },
    ]

    let products = [], packages = [], packs = [], content = [], url = "";
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0]),
        [kiosk, setKiosk] = ("");
    let id = JSON.parse(localStorage.getItem('user-data'));


    axios({
        method: "get",
        url: `https://server.seafreshing.com/api/user/get-user/0/${id.id}`,
        headers: {
            "auth-token": JSON.parse(localStorage.getItem('token'))
        }
    }).then(r => {
        localStorage.setItem('data-in-checkout', JSON.stringify(r.data.user))
    })
    let userData = JSON.parse(localStorage.getItem('data-in-checkout'))




    let kioskData = [], objItem = {}
    // userData.freezer.forEach(element => {
    for (let i = 0; i < userData.freezer.length; i++) {
        let element = userData.freezer[i]

        axios({
            method: "get",
            url: `https://server.seafreshing.com/api/kiosk/get-kiosk/${element.id}`,
        }).then(r => {
            // create content from here while searching for address of kiosk
            objItem.destination = {
                "fullAddress": userData.address[0].fullAddress + " " + userData.address[0].district + " " + userData.address[0].city + " " + userData.address[0].province + ", " + userData.address[0].zipCode,
                "latitude": userData.address[0].lat,
                "longitude": userData.address[0].lng,
                "name": userData.fullname + " - " + userData.address[0].label
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
            grab(r.data.kiosk, selectedAddressz)
            deliveree(r.data.kiosk, selectedAddressz)

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

    // });


    let subtotal = products.reduce((accumulator, object) => {
        return accumulator + object.clear;
    }, 0);

    let payTax = (0.11 * (subtotal + selectedDeliveryMethod.clear)).toFixed(0)

    let total = subtotal + selectedDeliveryMethod.clear + parseInt(payTax)

    const lala = async (data) => {

        try {
            const quote = await axios({
                method: "post",
                url: `https://server.seafreshing.com/api/shipment/get-lalamove-info`,
                headers: {
                    "authorization": JSON.parse(localStorage.getItem('token'))
                },
                data: {
                    "serviceType": "INSTANT",
                    "language": "en_ID",
                    "recipient": userData.fullname,
                    "stops": [
                        {
                            "address": selectedAddressz.fullAddress,
                            "coordinates": {
                                "latitude": parseFloat(selectedAddressz.lat),
                                "longitude": parseFloat(selectedAddressz.lng)
                            },
                        },
                        {
                            "address": data.fullAddress,
                            "coordinates": {
                                "latitude": parseFloat(data.lat),
                                "longitude": parseFloat(data.lng)
                            },
                        }
                    ],
                    "item": products,
                    "isRouteOptimized": true
                }
            })
            setLalamovePrice(lalamovePrice + quote.data.quotes[0].amount)
        } catch (error) {
            console.log(error);
        }
    }

    const grab = async (data, selectedAddressz) => {
        try {
            const quote = await axios({
                method: "post",
                url: `https://server.seafreshing.com/api/shipment/get-grab-info`,
                headers: {
                    "authorization": JSON.parse(localStorage.getItem('token'))
                },
                data: {
                    "merchantOrderID": "d97b3486-5989-4135-8562-2ff046141195",
                    "serviceType": "INSTANT",
                    "paymentMethod": "CASHLESS",
                    "packages": packages,
                    "origin": {
                        "address": data.fullAddress,
                        "coordinates": {
                            "latitude": parseFloat(data.lat),
                            "longitude": parseFloat(data.lng)
                        }
                    },
                    "destination": {
                        "address": selectedAddressz.fullAddress,
                        "coordinates": {
                            "latitude": parseFloat(selectedAddressz.lat),
                            "longitude": parseFloat(selectedAddressz.lng)
                        }
                    },
                    "recipient": {
                        "firstName": userData.fullname,
                        "lastName": userData.fullname,
                        "email": userData.email,
                        "phone": userData.mobilenumber,
                        "smsEnabled": true
                    },
                    "sender": {
                        "firstName": data.name,
                        "companyName": data.name,
                        "email": data.email ? data.email : "mail@mail.com",
                        "phone": data.mobileNumber,
                        "smsEnabled": true
                    },
                    "schedule": {
                        "pickupTimeFrom": "2022-04-24T12:37:28+08:00",
                        "pickupTimeTo": "2022-04-24T13:37:28+08:00"
                    }
                }
            })

            setGrabPrice(quote.data.quotes[0].amount)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAddress();
        getUser();
        deliveree();
        pay();
    }, [])

    const deliveree = async (data, selectedAddressz) => {
        console.log(selectedAddressz)
        try {
            const quote = await axios({
                method: "post",
                url: `https://server.seafreshing.com/api/shipment/get-deliveree-info`,
                headers: {
                    "authorization": JSON.parse(localStorage.getItem('token'))
                },
                data: {
                    "note": "no notes",
                    "packs": packs,
                    "locations": [
                        {
                            "address": data.fullAddress,
                            "latitude": parseFloat(data.lat),
                            "longitude": parseFloat(data.lng),
                            "recipient_name": data.name,
                            "recipient_phone": data.mobileNumber,
                            "note": "no notes"
                        }, {
                            "address": selectedAddressz.fullAddress,
                            "latitude": parseFloat(selectedAddressz.lat),
                            "longitude": parseFloat(selectedAddressz.lng),
                            "recipient_name": userData.name,
                            "recipient_phone": userData.mobilenumber,
                        }],
                    "vehicle_id": 12
                }
            })
            console.log(quote.data)
            setDelivereePrice(quote.data.deliveree.data[11].total_fees)

        } catch (error) {
            console.log(error);
        }
    }

    const pay = async () => {
        try {
            const toPay = await axios({
                method: "post",
                url: `https://server.seafreshing.com/api/orders/create-order`,
                headers: {
                    "auth-token": JSON.parse(localStorage.getItem('token'))
                },
                data: {
                    "amount": total,
                    "buyerDetails": {
                        "id": userData.id,
                        "userEmail": userData.email,
                        "userName": userData.fullname,
                        "userPhone": userData.mobilenumber
                    },
                    "orderDate": Date.now(),
                    "content": JSON.parse(localStorage.getItem('data-kiosk'))
                }
            })
            console.log(JSON.parse(localStorage.getItem('data-kiosk')), "url");
            url = toPay.data.data.paymentUrl
        } catch (error) {
            console.log(error); return error;
        }
    }
    pay()
    console.log(pay())



    const handleChange = () => {
        window.location.href = url
    }

    const [address, setAddress] = useState([]);
    const [user, setUser] = useState([]);

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


    const [selectedAddressz, setSelectedAddress] = useState(address);
    const getAddress = async () => {
        try {
            const data = await axios.get(`https://server.seafreshing.com/api/user/get-address/${userData.id}`)
            let temp = data.data.address.address;
            setAddress(temp)
            console.log(temp)

        } catch (e) {
            console.log(e.response.data)
            console.log(e.response)
        }
    }


    return (
        <div className="bg-gray-50">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Checkout</h2>

                <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <div>
                            <div className="md:flex md:items-center md:justify-between">
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                                </div>
                                <div className="mt-4 flex md:mt-0 md:ml-4">
                                    <button
                                        type="button"
                                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Add Address
                                    </button>
                                </div>
                            </div>
                            <RadioGroup value={selectedAddressz} onChange={setSelectedAddress}>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    {address.map((data) => (
                                        <RadioGroup.Option
                                            key={data.id}
                                            value={data}
                                            className={({ checked, active }) =>
                                                classNames(
                                                    checked ? 'border-transparent' : 'border-gray-300',
                                                    active ? 'ring-2 ring-indigo-500' : '',
                                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                                )
                                            }
                                        >
                                            {({ checked, active }) => (

                                                <>
                                                    <div className="flex-1 flex">
                                                        <div className="flex flex-col">
                                                            <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
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
                                                    {checked ? (<CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />) : null}
                                                    <div
                                                        className={classNames(
                                                            active ? 'border' : 'border-2',
                                                            checked ? 'border-indigo-500' : 'border-transparent',
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
                                    <div className="mt-1">{userData.fullname}</div>
                                </div>


                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1">{userData.email}</div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        {selectedAddressz.fullAddress} <p> </p>
                                        {selectedAddressz.district}<p> </p>
                                        {selectedAddressz.city}<p> </p>
                                        {selectedAddressz.province}
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
                                    <div className="mt-1">{userData.mobilenumber}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-10">
                            <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                                <RadioGroup.Label className="text-lg font-medium text-gray-900">Delivery method</RadioGroup.Label>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    {deliveryMethods.map((deliveryMethod) => (
                                        <RadioGroup.Option
                                            key={deliveryMethod.id}
                                            value={deliveryMethod}
                                            className={({ checked, active }) =>
                                                classNames(
                                                    checked ? 'border-transparent' : 'border-gray-300',
                                                    active ? 'ring-2 ring-indigo-500' : '',
                                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                                )
                                            }
                                        >
                                            {({ checked, active }) => (

                                                <>
                                                    <div className="flex-1 flex">
                                                        <div className="flex flex-col">
                                                            <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                                                {deliveryMethod.title}
                                                            </RadioGroup.Label>
                                                            <RadioGroup.Description
                                                                as="span"
                                                                className="mt-1 flex items-center text-sm text-gray-500"
                                                            >
                                                                {deliveryMethod.turnaround}
                                                            </RadioGroup.Description>
                                                            <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900" >
                                                                {deliveryMethod.price}
                                                            </RadioGroup.Description>
                                                        </div>
                                                    </div>
                                                    {checked ? (<CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />) : null}
                                                    <div
                                                        className={classNames(
                                                            active ? 'border' : 'border-2',
                                                            checked ? 'border-indigo-500' : 'border-transparent',
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
                    </div>

                    {/* Order summary */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <h3 className="sr-only">Items in your cart</h3>
                            <ul role="list" className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li key={product.id} className="flex py-6 px-4 sm:px-6">
                                        <div className="flex-shrink-0">
                                            <img src={product.imageSrc} alt={product.imageAlt} className="w-20 rounded-md" />
                                        </div>

                                        <div className="ml-6 flex-1 flex flex-col">
                                            <div className="flex">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm">
                                                        <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                                                            {product.title}
                                                        </a>
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-500">{product.name}</p>
                                                    <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                                                </div>
                                            </div>

                                            <div className="flex-1 pt-2 flex items-end justify-between">
                                                <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>

                                                <div className="ml-4">
                                                    <label htmlFor="quantity" className="sr-only">
                                                        Quantity
                                                    </label>
                                                    <p className="mt-1 text-sm font-medium text-gray-900">Qty: {product.qty}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">Rp. {subtotal}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Shipping</dt>
                                    <dd className="text-sm font-medium text-gray-900">Rp.{selectedDeliveryMethod.clear}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Taxes</dt>
                                    <dd className="text-sm font-medium text-gray-900">Rp.{payTax}</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base font-medium">Total</dt>
                                    <dd className="text-base font-medium text-gray-900">Rp.{total}</dd>
                                </div>
                            </dl>

                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                <button
                                    type="submit"
                                    onClick={handleChange}
                                    className="w-full bg-sky-400 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500"
                                >
                                    Complete Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
