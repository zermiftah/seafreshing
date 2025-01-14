import axios from 'axios';
import { useEffect, useState } from 'react';
import FetchHooks from '../../hooks/FetchHooks';

let user = JSON.parse(localStorage.getItem('user-data'));

const UserData = () => {
    const [userData, setUserData] = useState(null);
    const [priceTotalProduct, setPriceTotalProduct] = useState(0)
    const { data } = FetchHooks({
        method: 'get',
        url: `https://server.seafreshing.com/api/user/get-user/0/${user.id}`,
        headers: {
            'auth-token': JSON.parse(localStorage.getItem('token')),
        },
        callback: (res) => {
            const data = res.data.user
            localStorage.setItem('data-in-checkout', JSON.stringify(res.data.user));
            setUserData(JSON.parse(localStorage?.getItem('data-in-checkout')));
            let sumTotal = 0
            data.freezer.forEach((kios) => {
                kios.product.forEach((product) => {
                    sumTotal += parseInt(product.totalPrice)

                })
            })

            setPriceTotalProduct(sumTotal)



        },
    });


    const selectedAddress = {
        city: userData?.address[0]?.city,
        district: userData?.address[0]?.district,
        fullAddress: userData?.address[0]?.fullAddress,
        label: userData?.address[0]?.label,
        lat: userData?.address[0]?.lat,
        lng: userData?.address[0]?.lng,
        mobileNumber: userData?.address[0]?.mobileNumber,
        province: userData?.address[0]?.province,
        receivedName: userData?.address[0]?.receivedName,
        subdistrict: userData?.address[0]?.subdistrict,
        zipCode: userData?.address[0]?.zipCode,
    };

    const priceProduct = {
        subtotal: priceTotalProduct
    }



    return { userData, selectedAddress, priceProduct };
};

export default UserData;
