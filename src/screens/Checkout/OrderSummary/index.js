import React from 'react';

const OrderSummary = ({
    products = [],
    subtotal,
    payTax,
    total,
    shipping,
    handlePayment = () => { },
}) => (
    <div className="mt-10 lg:mt-0">
        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="sr-only">Items in your cart</h3>
            <ul className="divide-y divide-gray-200">
                {products.map((product) => (
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
                                    {product.price}
                                </p>

                                <div className="ml-4">
                                    <label htmlFor="quantity" className="sr-only">
                                        Quantity
                                    </label>
                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                        Qty: {product.qty}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
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
                    className="w-full bg-sky-400 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500"
                >
                    Complete Payment
                </button>
            </div>
        </div>
    </div>
);

export default OrderSummary;
