import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { methods } from './staticData';
import UserData from './modules/UserData';
import ShippingInformation from './ShippingInformation';
import OrderSummary from './OrderSummary';
import DeliveryMethods from './DeliveryMethods';
import FetchHooks from './hooks/FetchHooks';

export default function Checkout() {
    const
        [grabPrice, setGrabPrice] = useState(0),
        [delivereePrice, setDelivereePrice] = useState(0),
        [lalamovePrice, setLalamovePrice] = useState(0),
        [priceDelivery, setPriceDelivery] = useState(0)


    const [typVehicle, setTypeVehicle] = useState(null)
    const [typeDeliveryMethod, setTypeDeliveryMethod] = useState(null)
    const currFreezer = useRef(null);

    // let products = [],
    //     packages = [],
    //     packs = [],
    //     content = [],
    //     url = '';

    const deliveryMethods = methods({ lalamovePrice, grabPrice, delivereePrice });

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
        deliveryMethods[0]
    )
    // [kiosk, setKiosk] = '';

    const { userData, selectedAddress } = UserData();
    const elementId = userData?.freezer?.map((value, index) => value?.id);
    const elementProduct = userData?.freezer?.map((value) => value?.product);



    const { data } = FetchHooks({
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
                ...data?.kiosk,
                id: data?.kiosk?.id,
                kioskPhone: data?.kiosk?.mobileNumber,
                name: data?.kiosk?.name,
            },
            origin: {
                fullAddress: data?.kiosk?.fullAddress,
                latitude: data?.kiosk?.lat,
                longitude: data?.kiosk?.lng,
                name: data?.kiosk?.name,
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

    console.log(currFreezer)


    if (currFreezer.current)
        localStorage.setItem('data-kiosk', JSON.stringify(...currFreezer.current));

    const { destination, kioskDetails, origin, product, shipping, status } =
        currFreezer.current[0];




    const getLalaMove = () => {
        axios.post("https://server.seafreshing.com/api/shipment/get-lalamove-info",
            {

                "serviceType": typVehicle,
                "item": {
                    "categories": [
                        "FOOD DELIVERY",
                        "SEAFOOD"
                    ],
                    "handlingInstructions": [
                        "AWARE"
                    ],
                    "quantity": product.priceUnit,
                    "weight": product.productQuantityUnit
                },
                "origin": {
                    "address": destination?.address[0].fullAddress,
                    "coordinates": {
                        "lat": destination?.address[0].lat,
                        "lng": destination?.address[0].lng
                    }
                },
                "destination": {
                    "address": origin?.fullAddress,
                    "coordinates": {
                        "lat": origin?.latitude,
                        "lng": origin.longitude
                    }
                }
            }).then((res) => {
                const price = parseInt(res.data.data.priceBreakdown.total)
                setPriceDelivery(price)
                setLalamovePrice(price);
            }).catch((err) => {
                setPriceDelivery(0)
                setLalamovePrice(0);
            })
    }

    // const { data: deliveree } = FetchHooks({
    //     url: 'api/shipment/get-deliveree-info',
    //     method: 'post',
    //     headers: {
    //         authorization: JSON.parse(localStorage.getItem('token')),
    //     },
    //     body: {
    //         note: 'no notes',
    //         packs: packs,
    //         locations: [
    //             {
    //                 address: origin?.fullAddress,
    //                 latitude: parseFloat(origin.latitude),
    //                 longitude: parseFloat(origin.longitude),
    //                 recipient_name: kioskDetails.name,
    //                 recipient_phone: kioskDetails.mobileNumber,
    //                 note: 'no notes',
    //             },
    //             {
    //                 address: selectedAddress.fullAddress,
    //                 latitude: parseFloat(selectedAddress.lat),
    //                 longitude: parseFloat(selectedAddress.lng),
    //                 recipient_name: userData?.name,
    //                 recipient_phone: userData?.mobilenumber,
    //             },
    //         ],
    //         vehicle_id: 12,
    //     },
    //     callback: (res) => {
    //         setDelivereePrice(res.data.deliveree.data[11].total_fees);
    //     },
    // });

    // Price Method

    let subtotal = product?.reduce((accumulator, object) => {
        return accumulator + object.clearPrice;
    }, 0);
    let payTax = (0.11 * (subtotal + priceDelivery)).toFixed(0);
    let total = subtotal + selectedDeliveryMethod.clear + parseInt(payTax);

    const handlePayment = async (e) => {
        e.preventDefault();
        const headers = {
            'auth-token': JSON.parse(localStorage.getItem('token'))
        }
        await axios.post('https://server.seafreshing.com/api/orders/create-order', {
            amount: total,
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
                        id: kioskDetails.id,
                        kioskPhone: kioskDetails.kioskPhone,
                        name: kioskDetails.name,
                    },
                    origin: {
                        fullAddress: origin.fullAddress,
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        name: origin.name,
                    },
                    product,
                    shipping: {
                        cost: priceDelivery,
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
        });
    };

    useEffect(() => {
        if (typVehicle) {
            if (typeDeliveryMethod === "lalamove") {
                getLalaMove()
                console.log(typeDeliveryMethod)
            }
            if (typeDeliveryMethod === "deliveree") {
                console.log(typeDeliveryMethod)

            }

        }
    }, [typVehicle])





    return (
        <div className="bg-gray-50">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Checkout</h2>

                <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <ShippingInformation
                            fullname={userData?.fullname}
                            email={userData?.email}
                            company={userData?.company}
                            mobilenumber={userData?.mobilenumber}
                            province={selectedAddress.province}
                            zipcode={selectedAddress.zipCode}
                            district={selectedAddress.district}
                            city={selectedAddress.city}
                            fulladdress={selectedAddress.fullAddress}
                        />
                        <DeliveryMethods
                            selectedDeliveryMethod={selectedDeliveryMethod}
                            listMethod={deliveryMethods}
                            setSelectedDeliveryMethod={setSelectedDeliveryMethod}
                            onChangeTypeVehicle={(delivery) => {
                                setTypeDeliveryMethod(delivery.id)
                                setTypeVehicle(delivery.key)
                            }}
                        />

                    </div>
                    <OrderSummary
                        products={product}
                        payTax={payTax}
                        shipping={priceDelivery}
                        subtotal={subtotal}
                        total={total}
                        handlePayment={handlePayment}
                        listMethod={deliveryMethods}
                        kiosk={kioskDetails}
                    />

                </form>
            </div>
        </div>
    );
}

