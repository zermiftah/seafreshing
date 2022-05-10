import { Link } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Freezer = () => {
    const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const token = JSON.parse(localStorage.getItem('token'));
    const userData = JSON.parse(localStorage.getItem('user-data'));
    console.log(items)
    useEffect(() => {
        getFreezer();
    }, [])

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

    // const totPrice = items.reduce((total, item) => {
    //     total += (item.product[0].clearPrice)
    //     return total;
    // }, 0);

    // const removeItem = async (freezerId, productId) => {
    //     try {
    //         let response = await axios.delete('https://server.seafreshing.com/api/user/delete-freezer', {
    //             headers: {
    //                 'auth-token': token,
    //             }
    //         }, {
    //             'id': userData.id,
    //             "freezer.id": freezerId,
    //             'productId': productId,

    //         });
    //         console.log(response.data)
    //     } catch (e) {
    //         console.log(e)
    //         console.log(e.response.data)
    //     }
    // }

    return (
        <div class="bg-white">
            <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Freezer</h2>
                <form class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                    <section aria-labelledby="cart-heading" class="lg:col-span-7">
                        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
                        {
                            items.map(cart => (
                                <>
                                    <ul role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
                                        <li class="flex py-6 sm:py-10">
                                            <div class="flex-shrink-0">
                                                <img src={"abc"} alt="Front of men&#039;s Basic Tee in sienna." class="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48" />
                                            </div>

                                            <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div class="flex justify-between">
                                                            <h3 class="text-sm">
                                                                <a href="#" class="font-medium text-gray-700 hover:text-gray-800"> Salmon Fillet</a>
                                                            </h3>
                                                        </div>
                                                        <div class="mt-1 flex text-sm">
                                                            <p class="text-gray-500">Ikan</p>

                                                            <p class="ml-4 pl-4 border-l border-gray-200 text-gray-500">Large</p>
                                                        </div>
                                                        <p class="mt-1 text-sm font-medium text-gray-900">Rp.30.000</p>
                                                    </div>

                                                    <div class="mt-4 sm:mt-0 sm:pr-9">
                                                        <label for="quantity-0" class="sr-only">Quantity, Basic Tee</label>
                                                        <select id="quantity-0" name="quantity-0" class="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                        </select>

                                                        <div class="absolute top-0 right-0">
                                                            <button type="button" class="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                                                                <span class="sr-only">Remove</span>
                                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p class="mt-4 flex text-sm text-gray-700 space-x-2">
                                                    <svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                    </svg>
                                                    <span>In stock</span>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </>
                            ))
                        }
                    </section>

                    <section aria-labelledby="summary-heading" class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
                        <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

                        <dl class="mt-6 space-y-4">
                            <div class="flex items-center justify-between">
                                <dt class="text-sm text-gray-600">Subtotal</dt>
                                <dd class="text-sm font-medium text-gray-900">Rp.90.000</dd>
                            </div>
                            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt class="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Learn more about how shipping is calculated</span>
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </dt>
                                <dd class="text-sm font-medium text-gray-900">Rp.10.000</dd>
                            </div>
                            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt class="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Learn more about how tax is calculated</span>
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </dt>
                                <dd class="text-sm font-medium text-gray-900">Rp.10.000</dd>
                            </div>
                            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt class="text-base font-medium text-gray-900">Order total</dt>
                                <dd class="text-base font-medium text-gray-900">Rp.110.000</dd>
                            </div>
                        </dl>

                        <div class="mt-6">
                            <Link to="/checkout">
                                <button type="submit" class="w-full bg-sky-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500">Checkout</button>
                            </Link>
                        </div>
                    </section>
                </form>
            </div>
        </div>

    );
}

export default Freezer;