import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { methods } from './staticData';
import UserData from './modules/UserData';
import ContactInformation from './ContactInformation';
import ShippingInformation from './ShippingInformation';
import OrderSummary from './OrderSummary';
import DeliveryMethods from './DeliveryMethods';
import FetchHooks from './hooks/FetchHooks';

export default function Checkout() {
    const [grabPrice, setGrabPrice] = useState(0),
        [delivereePrice, setDelivereePrice] = useState(0),
        [lalamovePrice, setLalamovePrice] = useState(0);

    const currFreezer = useRef(null);

    let products = [],
        packages = [],
        packs = [],
        content = [],
        url = '';

    const deliveryMethods = methods({ lalamovePrice, grabPrice, delivereePrice });

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
        deliveryMethods[0]
    ),
        [kiosk, setKiosk] = '';

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

    if (currFreezer.current)
        localStorage.setItem('data-kiosk', JSON.stringify(...currFreezer.current));

    const { destination, kioskDetails, origin, product, shipping, status } =
        currFreezer.current[0];

    const { data: grab } = FetchHooks({
        url: 'api/shipment/get-grab-info',
        method: 'post',
        headers: {
            authorization: JSON.parse(localStorage.getItem('token')),
        },
        body: {
            merchantOrderID: 'd97b3486-5989-4135-8562-2ff046141195',
            serviceType: 'INSTANT',
            paymentMethod: 'CASHLESS',
            packages: packages,
            origin: {
                address: origin?.fullAddress,
                coordinates: {
                    latitude: parseFloat(origin?.lat),
                    longitude: parseFloat(origin?.lng),
                },
            },
            destination: {
                address: selectedAddress.fullAddress,
                coordinates: {
                    latitude: parseFloat(selectedAddress.lat),
                    longitude: parseFloat(selectedAddress.lng),
                },

            },
            recipient: {
                firstName: userData?.fullname,
                lastName: userData?.fullname,
                email: userData?.email,
                phone: userData?.mobilenumber,
                smsEnabled: true,
            },
            sender: {
                firstName: data?.name,
                companyName: data?.name,
                email: data?.email ? data.email : 'mail@mail.com',
                phone: data?.mobileNumber,
                smsEnabled: true,
            },
            schedule: {
                pickupTimeFrom: '2022-04-24T12:37:28+08:00',
                pickupTimeTo: '2022-04-24T13:37:28+08:00',
            },
        },
        callback: (res) => {
            const { data } = res
            setGrabPrice(data.quotes[0]?.amount);
        },
    });

    const { data: lalamove } = FetchHooks({
        url: 'api/shipment/get-lalamove-info',
        method: 'post',
        headers: {
            authorization: JSON.parse(localStorage.getItem('token')),
        },
        body: {
            serviceType: "MOTORCYCLE",
            item: {
                categories: [
                    "FOOD DELIVERY",
                    "SEAFOOD"
                ],
                handlingInstructions: [
                    "AWARE"
                ],
                quantity: 1,
                weight: 1
            },
            origin: {
                address: origin.fullAddress,
                coordinates: {
                    lat: origin.latitude,
                    lng: origin.longitude
                }
            },
            destination: {
                address: destination[0]?.fullAddress,
                coordinates: {
                    lat: destination[0]?.lat,
                    lng: destination[0]?.lng
                }
            }
        },
        callback: (res) => {
            setLalamovePrice(lalamovePrice + res.data.quotes[0]?.amount);
        },
    });

    const { data: deliveree } = FetchHooks({
        url: 'api/shipment/get-deliveree-info',
        method: 'post',
        headers: {
            authorization: JSON.parse(localStorage.getItem('token')),
        },
        body: {
            note: 'no notes',
            packs: packs,
            locations: [
                {
                    address: origin?.fullAddress,
                    latitude: parseFloat(origin.latitude),
                    longitude: parseFloat(origin.longitude),
                    recipient_name: kioskDetails.name,
                    recipient_phone: kioskDetails.mobileNumber,
                    note: 'no notes',
                },
                {
                    address: selectedAddress.fullAddress,
                    latitude: parseFloat(selectedAddress.lat),
                    longitude: parseFloat(selectedAddress.lng),
                    recipient_name: userData?.name,
                    recipient_phone: userData?.mobilenumber,
                },
            ],
            vehicle_id: 12,
        },
        callback: (res) => {
            setDelivereePrice(res.data.deliveree.data[11].total_fees);
        },
    });

    // Price Method
    let subtotal = product?.reduce((accumulator, object) => {
        return accumulator + object.clearPrice;
    }, 0);
    let payTax = (0.11 * (subtotal + selectedDeliveryMethod.clear)).toFixed(0);
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
                        cost: shipping.cost,
                        service: shipping.service,
                        status: shipping.status,
                        trackUrl: shipping.trackUrl,
                    },
                    status,
                },
            ],
        }, { headers });
    };

    return (
        <div className="bg-gray-50">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Checkout</h2>

                <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <ContactInformation email={userData?.email} />
                        <ShippingInformation
                            fullname={userData?.fullname}
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
                        />
                    </div>
                    <OrderSummary
                        products={product}
                        payTax={payTax}
                        shipping={selectedDeliveryMethod.clear}
                        subtotal={subtotal}
                        total={total}
                        handlePayment={handlePayment}
                    />
                </form>
            </div>
        </div>
    );
}

/** Alamat {
    city : "KOTA JAKARTA UTARA", 
    zipCode : 14440
    lat : "-6.129126670421264"
    lng : "106.81753735989332"
    district : "PADEMANGAN"
    subdistrict : "PADEMANGAN BARAT"
    province : "DKI JAKARTA"
    label : "Building"
    fullAddress : "Jl. Industri Dalam no. 1, Kel. Pademangan barat, kec. Pademangan, Jaka…"
    mobileNumber : "085668279796", 
    recievedName: :juki
  } 
 * **/
