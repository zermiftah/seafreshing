import React from 'react';

const ContactInformation = ({ email }) => (
    <div>
        <h2 className="text-lg font-medium text-gray-900">Contact information</h2>
        <div className="mt-4">
            <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
            >
                Email address
            </label>
            <div className="mt-1"> {email}</div>
        </div>
    </div>
);

export default ContactInformation;
