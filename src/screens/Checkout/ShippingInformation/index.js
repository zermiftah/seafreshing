import React from 'react';

const ShippingInformation = ({
    fullname,
    email,
    fulladdress,
    district,
    city,
    province,
    zipcode,
    mobilenumber,
}) => (
    <div>
        <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
                <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Fullname
                </label>
                <div className="mt-1">{fullname}</div>
            </div>
            <div>
                <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                >
                    E-mail
                </label>
                <div className="mt-1">{email}</div>
            </div>
            <div className="sm:col-span-2">
                <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                >
                    Address
                </label>
                <div className="mt-1">{fulladdress}</div>
            </div>
            <div className="sm:col-span-2">
                <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700"
                >
                    District, etc.
                </label>
                <div className="mt-1">{district}</div>
            </div>
            <div>
                <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                >
                    City
                </label>
                <div className="mt-1">{city}</div>
            </div>
            <div>
                <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                >
                    State / Province
                </label>
                <div className="mt-1">{province}</div>
            </div>
            <div>
                <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                >
                    Postal code
                </label>
                <div className="mt-1">{zipcode}</div>
            </div>
            <div className="sm:col-span-2">
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                >
                    Phone
                </label>
                <div className="mt-1">{mobilenumber}</div>
            </div>
        </div>
    </div>
);

export default ShippingInformation;
