import React from 'react';

const OrderSummary = ({
    subtotal,
    payTax,
    total,
    shipping,
    onClickMethodDelivery,
    freezer,
    children,
    handlePayment = () => { },
}) => (
    <div className="mt-10 lg:mt-0">
        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="sr-only">Items in your cart</h3>
            {children}
            <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">{`Rp. ${subtotal}`}</dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">{`Rp.${shipping}`}</dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">{`Rp.${payTax}`}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">{`Rp.${total}`}</dd>
                </div>
            </dl>

            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                    type="submit"
                    onClick={handlePayment}
                    className="w-full bg-slate-200 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-black hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-slate-700"
                >
                    Complete Payment
                </button>
            </div>
        </div>
    </div>
);

export default OrderSummary;
