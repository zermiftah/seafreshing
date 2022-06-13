import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { methods } from './staticData';
import UserData from './modules/UserData';
import OrderSummary from './OrderSummary';
import DeliveryMethods from './DeliveryMethods';
import FetchHooks from './hooks/FetchHooks';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ShippingInformation from './ShippingInformation';
export default function Checkout() {
    const
        [grabPrice, setGrabPrice] = useState(0),
        [delivereePrice, setDelivereePrice] = useState(0),
        [lalamovePrice, setLalamovePrice] = useState(0)

    const deliveryMethods = methods({ lalamovePrice, grabPrice, delivereePrice });

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
        deliveryMethods[0]
    )
    const [typVehicle] = useState(null)
    const [typeDeliveryMethod] = useState(null)
    const currFreezer = useRef(null);
    const [freezerState, setFreezerState] = useState([])
    const [freezerChoosen, setFreezerChoosen] = useState()
    let [priceDelivery, setPriceDelivery] = useState(0)

    // [kiosk, setKiosk] = '';

    const { userData, priceProduct } = UserData();
    const elementId = userData?.freezer?.map((value, index) => value?.id);
    const elementProduct = userData?.freezer?.map((value) => value?.product);



    const { data: dataKiosk } = FetchHooks({
        method: 'get',
        url: `/api/kiosk/get-kiosk/${elementId ? elementId[0] : ''}`,
    });


    currFreezer.current = [
        {
            destination: {
                ...userData,
                latitude: userData?.address[0]?.lat,
                longitude: userData?.address[0]?.lng,
                name: userData?.fullname + ' - ' + userData?.address[0]?.label,
            },
            kioskDetails: {
                ...dataKiosk?.kiosk,
                id: dataKiosk?.kiosk?.id,
                kioskPhone: dataKiosk?.kiosk?.mobileNumber,
                name: dataKiosk?.kiosk?.name,
            },
            origin: {
                fullAddress: dataKiosk?.kiosk?.fullAddress,
                latitude: dataKiosk?.kiosk?.lat,
                longitude: dataKiosk?.kiosk?.lng,
                name: dataKiosk?.kiosk?.name,
            },
            product: elementProduct ? elementProduct[0] : [],
            shipping: {
                cost: selectedDeliveryMethod.clear,
                service: selectedDeliveryMethod.id,
                status: '',
                trackUrl: '',
            },
            status: 'PENDING',
        },
    ];




    if (currFreezer.current)
        localStorage.setItem('data-kiosk', JSON.stringify(...currFreezer.current));

    const { destination, kioskDetails, origin, product, shipping, status } =
        currFreezer.current[0];



    const [destinationState, setDestinationState] = useState()

    const getLalaMove = (originPlace, vehicle) => {
        axios.post("https://server.seafreshing.com/api/shipment/get-lalamove-info",
            {

                "serviceType": vehicle,
                "item": {
                    "categories": [
                        "FOOD DELIVERY",
                        "SEAFOOD"
                    ],
                    "handlingInstructions": [
                        "AWARE"
                    ],
                    "quantity": product.priceUnit,
                    "weight": "" + freezerState[freezerChoosen].weight
                },
                "origin": {
                    "address": originPlace?.address,
                    "coordinates": {
                        "lat": originPlace?.lat,
                        "lng": originPlace.lng
                    }
                },
                "destination": {
                    "address": destinationState ? destinationState.address : destination?.address[0].fullAddress,
                    "coordinates": {
                        "lat": destinationState ? destinationState.lat : destination?.address[0].lat,
                        "lng": destinationState ? destinationState.lng : destination?.address[0].lng
                    }
                }
            }).then((res) => {
                const price = parseInt(res.data.data.priceBreakdown.total)
                freezerState[freezerChoosen] = { ...freezerState[freezerChoosen], price, service: 'alamove' }
                setFreezerState(freezerState)
                setLalamovePrice(price);

            }).catch((err) => {
                setPriceDelivery(0)
                setLalamovePrice(0);
                console.log(err)
            })
    }

    const getDeliveree = (originPlace, vehicle) => {
        axios.post('https://server.seafreshing.com/api/shipment/get-deliveree-info',

            {
                "orderId": "628cfc91856eaaf5eec5a0a8",
                "locations": [
                    {
                        "address": originPlace?.address,
                        "latitude": originPlace?.lat,
                        "longitude": originPlace.lng,
                        "recipient_name": freezerState[freezerChoosen].name,
                        "recipient_phone": freezerState[freezerChoosen].mobileNumber
                    },
                    {
                        "address": destinationState ? destinationState.address : destination?.address[0].fullAddress,
                        "latitude": destinationState ? destinationState.lat : destination?.address[0].lat,
                        "longitude": destinationState ? destinationState.lng : destination?.address[0].lng,
                        "recipient_name": destination?.name,
                        "recipient_phone": destination?.mobilenumber
                    }
                ],
                "id": "xMvDG07dDVzL",
                "vehicleId": vehicle
            }
        ).then((res) => {

            const data = res.data.deliveree.data.find((data) => data.vehicle_type_id === vehicle)
            const price = data.total_fees
            setDelivereePrice(price)
            freezerState[freezerChoosen] = { ...freezerState[freezerChoosen], price, service: "deliveree" }
            setFreezerState(freezerState)

        }).catch((err) => {
            console.log(err)
        })
    }


    const getGrab = (originPlace, vehicle) => {

        axios.post(
            "https://server.seafreshing.com/api/shipment/get-grab-info",
            {
                "serviceType": vehicle,
                "schedule": {
                    "pickupTimeFrom": "2022-06-01T10:16:19+07:00",
                    "pickupTimeTo": "2022-06-01T13:16:19+07:00"
                },
                "orderId": "6293801e5317396e5269744e",
                "sender": {
                    "email": "albertus@seafreshing.com",
                    "firstName": originPlace.name,
                    "lastName": "",
                    "phone": originPlace.mobileNumber,
                    "smsEnabled": true
                },
                "origin": {
                    "address": originPlace?.address,
                    "coordinates": {
                        "latitude": Number(originPlace?.lat),
                        "longitude": Number(originPlace.lng)
                    }
                },
                "destination": {
                    "address": destinationState ? destinationState.address : destination?.address[0].fullAddress,
                    "coordinates": {
                        "latitude": destinationState ? Number(destinationState.lat) : Number(destination?.address[0].lat),
                        "longitude": destinationState ? Number(destinationState.lng) : Number(destination?.address[0].lng)
                    }
                },
                "recipient": {
                    "email": destination.email,
                    "firstName": destination.name,
                    "lastName": "",
                    "phone": destination.mobileNumber,
                    "smsEnabled": true
                },
                "paymentMethod": "CASHLESS",
                "id": "1EPNGc9DRqC0",
                "merchantOrderID": "1EPNGc9DRqC0",
                "packages": [
                    {
                        "description": "Seafreshing",
                        "dimensions": {
                            "depth": 10,
                            "height": 5,
                            "weight": freezerState[freezerChoosen].weight,
                            "width": 5
                        },
                        "name": originPlace.name,
                        "price": originPlace.priceProductf,
                        "quantity": freezerState[freezerChoosen].weight
                    }
                ]
            },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            },

        )
            .then(
                (response) => {
                    const price = response.data.quotes[0].amount
                    setGrabPrice(price)
                    freezerState[freezerChoosen] = { ...freezerState[freezerChoosen], price, service: 'grab_express' }
                    setFreezerState(freezerState)
                }
            ).catch((err) => {

            })
    }

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setLalamovePrice(0)
        setDelivereePrice(0)
        setGrabPrice(0)
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }




    let payTax = (0.11 * (priceProduct.subtotal + priceDelivery)).toFixed(0);


    const sumShipping = freezerState.reduce((accumulator, object) => {
        return accumulator + object.price;
    }, 0);

    const handlePayment = async (e) => {
        e.preventDefault();
        const headers = {
            'auth-token': JSON.parse(localStorage.getItem('token'))
        }
        var BreakException = {}
        try {
            if (freezerState.length >= 3 && !isNaN(sumShipping)) {
                axios.post('https://server.seafreshing.com/api/orders/create-order', {
                    amount: priceProduct?.subtotal + parseInt(payTax) + sumShipping,
                    buyerDetails: {
                        id: destination.id,
                        userEmail: destination.email,
                        userName: destination.fullname,
                        userPhone: destination.mobilenumber,
                    },
                    orderDate: '1653162005502',
                    content: [
                        {
                            destination: {
                                fullAddress: destination[0]?.fullAddress,
                                latitude: destination[0]?.lat,
                                longitude: destination[0]?.lng,
                                name: destination[0]?.receivedName,
                            },
                            kioskDetails: {
                                id: freezerState[0].id,
                                kioskPhone: freezerState[0].mobileNumber,
                                name: freezerState[0].name,
                            },
                            origin: {
                                fullAddress: freezerState[0].address,
                                latitude: freezerState[0].lat,
                                longitude: freezerState[0].lng,
                                name: freezerState[0].name,
                            },
                            product,
                            shipping: {
                                cost: sumShipping,
                                service: typeDeliveryMethod,
                                status: status,
                                trackUrl: shipping.trackUrl,
                            },
                            status,
                        },
                    ],
                }, { headers },
                ).then((res) => {
                    console.log(res)
                    window.open(res.data.data.paymentUrl, '_blank')
                }).catch((err) => {
                    throw BreakException
                });

            } else {
                throw BreakException
            }

        } catch (err) {
            alert('complete delivery method')
            if (err !== BreakException) throw e
        }


    };






    return (
        <div className="bg-gray-50">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Checkout</h2>
                <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <ShippingInformation
                            selectedDeliveryMethod={selectedDeliveryMethod}
                            listMethod={deliveryMethods}
                            freezerChoosen={freezerChoosen}
                            setSelectedDeliveryMethod={setSelectedDeliveryMethod}
                            onChangeTypeVehicle={(delivery) => {
                                if (delivery.id === 'alamove') {
                                    getLalaMove(freezerState[freezerChoosen], delivery.key)
                                }
                                if (delivery.id === "deliveree") {
                                    getDeliveree(freezerState[freezerChoosen], delivery.key)
                                }
                                if (delivery.id === "grab_express") {
                                    getGrab(freezerState[freezerChoosen], delivery.key)
                                }

                            }}
                            onChangeAddress={(value) => {
                                setFreezerState([])
                                setDestinationState({
                                    address: value.fullAddress,
                                    lng: value.lng,
                                    lat: value.lat
                                })
                            }}
                        />
                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto" onClick={(event) => {
                                    setLalamovePrice(0)
                                    setDelivereePrice(0)
                                    setGrabPrice(0)
                                }}>
                                    <div className="flex min-h-full items-center justify-center p-4 text-center w-400" >
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Choose payment
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <DeliveryMethods
                                                        selectedDeliveryMethod={selectedDeliveryMethod}
                                                        listMethod={deliveryMethods}
                                                        freezerChoosen={freezerChoosen}
                                                        setSelectedDeliveryMethod={setSelectedDeliveryMethod}
                                                        onChangeTypeVehicle={(delivery) => {
                                                            if (delivery.id === 'alamove') {
                                                                getLalaMove(freezerState[freezerChoosen], delivery.key)
                                                            }
                                                            if (delivery.id === "deliveree") {
                                                                getDeliveree(freezerState[freezerChoosen], delivery.key)
                                                            }
                                                            if (delivery.id === "grab_express") {
                                                                getGrab(freezerState[freezerChoosen], delivery.key)
                                                            }
                                                        }}
                                                        onChangeAddress={(value) => {

                                                            setDestinationState({
                                                                address: value.fullAddress,
                                                                lng: value.lng,
                                                                lat: value.lat
                                                            })

                                                        }}
                                                    />
                                                </div>

                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={closeModal}
                                                    >
                                                        Done
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                    <OrderSummary
                        products={product}
                        freezerState={freezerState}
                        payTax={parseInt(payTax).toLocaleString()}
                        freezer={userData?.freezer}
                        shipping={isNaN(sumShipping) ? 0 : sumShipping.toLocaleString()}
                        subtotal={priceProduct?.subtotal.toLocaleString()}
                        total={(priceProduct?.subtotal + parseInt(payTax) + sumShipping).toLocaleString()}
                        handlePayment={handlePayment}
                        listMethod={deliveryMethods}
                        kiosk={kioskDetails}
                    >
                        <ul className="divide-y divide-gray-200">
                            {
                                userData?.freezer &&
                                userData?.freezer.map((freezer, indexFreezer) => (
                                    <>

                                        {
                                            freezer.product.map((product) => (
                                                <>
                                                    <li key={product.id} className="flex py-6 px-4 sm:px-6">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={product.image}
                                                                alt={product.image}
                                                                className="w-20 rounded-md"
                                                            />
                                                        </div>

                                                        <div className="ml-6 flex-1 flex flex-col">
                                                            <div className="flex">
                                                                <div className="min-w-0 flex-1">
                                                                    <h4 className="text-sm">
                                                                        <a
                                                                            href={product.href}
                                                                            className="font-medium text-gray-700 hover:text-gray-800"
                                                                        >
                                                                            {product.title}
                                                                        </a>
                                                                    </h4>
                                                                    <p className="mt-1 text-sm text-gray-500">{product.name}</p>
                                                                    <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex-1 pt-2 flex items-end justify-between">
                                                                <p className="mt-1 text-sm font-medium text-gray-900">
                                                                    Rp {product.totalPrice.toLocaleString()}
                                                                </p>


                                                                <div className="ml-4">
                                                                    <label htmlFor="quantity" className="sr-only">
                                                                        Quantity
                                                                    </label>
                                                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                                                        Qty: {product.productQuantity}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </li>

                                                </>
                                            ))
                                        }
                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <p className="mt-1 text-sm font-medium text-gray-900">
                                                Cost Delivery : {freezerState[indexFreezer]?.price}
                                            </p>
                                        </div>
                                        <button
                                            type="submit"
                                            onClick={(event) => {
                                                openModal()

                                                let weight = 0
                                                freezer.product.forEach((data) => {
                                                    weight += data.productQuantity
                                                })
                                                setFreezerChoosen(indexFreezer)
                                                axios.get('https://server.seafreshing.com/api/kiosk/get-kiosk/' + freezer.id).then((res) => {
                                                    const kiosk = res.data.kiosk
                                                    freezerState[indexFreezer] = { id: kiosk.id, lng: kiosk.lng, lat: kiosk.lat, address: kiosk.fullAddress, weight: weight, mobileNumber: kiosk.mobileNumber, name: kiosk.name, email: kiosk.email }
                                                    setFreezerState(freezerState)

                                                }).catch((err) => { console.log(err) })
                                                event.preventDefault()
                                            }}
                                            className="w-full bg-green-400 border border-transparent rounded-md shadow-sm py-2 px-1 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500"
                                        >
                                            Choose Method Delivery
                                        </button>
                                    </>
                                )
                                )
                            }
                        </ul>

                    </OrderSummary>

                </form>
            </div>
        </div >
    );
}



