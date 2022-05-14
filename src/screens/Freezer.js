import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Freezer = () => {
    const [items, setItems] = useState([]);
    const [finalQuantity, setFinalQuantity] = useState([]);
    const token = JSON.parse(localStorage.getItem('token'));
    const userData = JSON.parse(localStorage.getItem('user-data'));
    const qs = require('qs');

    useEffect(() => {
        getFreezer();
        handleMin();
        handlePlus();
        totPrice();
    }, [items, finalQuantity])

    const getFreezer = async () => {
        try {
            let response = await axios.get(`https://server.seafreshing.com/api/user/get-freezer/${userData.id}`, {
                headers: {
                    'auth-token': token,
                }
            });
            setItems(response.data.freezer);
        } catch (e) {
            console.log(e)
        }
    }

    const handleMin = (freezer, product) => async () => {
        try {
            let response = await axios.patch('https://server.seafreshing.com/api/user/set-plus-min-click', qs.stringify({
                'idUser': userData.id,
                'freezerId': freezer.id,
                'productId': product.id,
            }), {
                headers: {
                    'auth-token': token,
                }
            })
            setFinalQuantity(response.data.finalQuantity)
        } catch (e) {
            console.log(e.response.data)
            console.log(e.response)
        }
    }

    const handlePlus = (freezer, product) => async () => {
        try {
            let response = await axios.patch('https://server.seafreshing.com/api/user/set-plus-min-click', qs.stringify({
                'idUser': userData.id,
                'freezerId': freezer.id,
                'productId': product.id,
                'isPlus': true,
            }), {
                headers: {
                    'auth-token': token,
                }
            })
            setFinalQuantity(response.data.finalQuantity)
        } catch (e) {
            console.log(e.response.data)
            console.log(e.response)
        }
    }

    const getPrice = () => {
        let price = [];

        if (items[0]) {
            items[0].freezer.map(freezer => freezer.product.map(product => {
                if (product.isChecked === true) {
                    price.push(product.totalPrice)
                }
            }))
        }

        return price;
    }

    const totPrice = () => {
        let tot = getPrice().reduce((total, price) => {
            return total + price
        }, 0)

        return tot;
    }

    const removeItem = async (freezerId, productId) => {
        try {
            let response = await axios.delete('https://server.seafreshing.com/api/user/delete-freezer', {
                headers: {
                    'auth-token': token,
                }
            }, {
                'id': userData.id,
                "freezerId": freezerId,
                'productId': productId,

            });
            console.log(response.data.msg)
        } catch (e) {
            console.log(e)
            console.log(e.response.data)
        }
    }

    return (
        <div class="bg-white">
            <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Freezer</h2>
                {
                    items.length !== 0 ?
                        <form class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                            <section aria-labelledby="cart-heading" class="lg:col-span-7">
                                <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
                                {
                                    items.map(item => (
                                        <>
                                            {
                                                item.freezer.map(freezer => (
                                                    freezer.product.length >= 0 ?
                                                        freezer.product.map(product => (
                                                            <ul key={product.id} role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
                                                                <li class="flex py-6 sm:py-10">
                                                                    <div class="flex-shrink-0">
                                                                        <img src={product.image} alt="Front of men&#039;s Basic Tee in sienna." class="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48" />
                                                                    </div>

                                                                    <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                                                        <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                                            <div>
                                                                                <div class="flex justify-between">
                                                                                    <h3 class="text-sm">
                                                                                        <Link to={`/DetailProduct/${product.id}`} class="font-medium text-gray-700 hover:text-gray-800">{product.name}</Link>
                                                                                    </h3>
                                                                                </div>
                                                                                <div class="mt-1 flex text-sm">
                                                                                    <p class="text-gray-500">{freezer.kioskName}</p>

                                                                                    <p class="ml-4 pl-4 border-l border-gray-200 text-gray-500">{product.priceUnit}</p>
                                                                                </div>
                                                                                <p class="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                                                                            </div>

                                                                            <div class="mt-4 sm:mt-0 sm:pr-9">
                                                                                <label for="quantity-0" class="sr-only">Quantity, Basic Tee</label>
                                                                                <div className="pr-8 flex">
                                                                                    <span onClick={handleMin(freezer, product)} className="cursor-pointer font-semibold">-</span>
                                                                                    <input
                                                                                        disabled
                                                                                        type="text"
                                                                                        className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
                                                                                        value={product.productQuantity ? product.productQuantity : 1}
                                                                                    />
                                                                                    <span onClick={handlePlus(freezer, product)} className="cursor-pointer font-semibold">+</span>
                                                                                </div>

                                                                                <div class="absolute top-0 right-0">
                                                                                    <button onClick={() => removeItem()} type="button" class="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                                                                                        <span class="sr-only">Remove</span>
                                                                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        ))
                                                        :
                                                        ""
                                                ))
                                            }
                                        </>
                                    ))
                                }
                            </section>

                            <section aria-labelledby="summary-heading" class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
                                <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

                                <dl class="mt-6 space-y-4">
                                    <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                        <dt class="text-base font-medium text-gray-900">Order total</dt>
                                        <dd class="text-base font-medium text-gray-900">{`Rp. ${totPrice()}`}</dd>
                                    </div>
                                </dl>

                                <div class="mt-6">
                                    <Link to="/checkout">
                                        <button type="submit" class="w-full bg-sky-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500">Checkout</button>
                                    </Link>
                                </div>
                            </section>
                        </form>
                        :
                        <span>Your freezer is empty</span>
                }
            </div>
        </div>

    );
}

export default Freezer;