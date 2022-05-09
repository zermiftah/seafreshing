import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import axios from "axios";
import HeaderHS from "../components/HeaderHS";
import Footer from "../components/Footers"
import TrendingProduct from "../components/TrendingProduct/TrendingProduct"


const SingleProduct = ({ match }) => {
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(0);
    const userData = JSON.parse(localStorage.getItem('user-data'));
    const token = JSON.parse(localStorage.getItem('token'));
    const qs = require('qs');

    console.log(product)

    useEffect(() => {
        fetchproduct();
    }, []);

    const fetchproduct = async () => {
        try {
            const data = await axios.get(`https://server.seafreshing.com/api/product/get-product/${match.params.id}`)
            let temp = data.data.product;
            setProduct(temp)
        } catch (e) {
            return e.response.data.msg
        }
    }

    const handleAddToCart = async () => {
        try {
            let response = await axios.patch('https://server.seafreshing.com/api/user/add-freezer', JSON.stringify({
                'clearPrice': product[0].price.value.replace(/\D/g, ''),
                'productId': match.params.id,
                'image': product[0].image[0].imgUrl,
                'name': product[0].productName,
                'price': product[0].price.value,
                'priceUnit': "Kg",
                'productQuantity': 12,
                'kioskName': product[0].kioskName,
                'kioskId': product[0].kioskId,
                'idUser': userData.id,
                'kioskCity': product[0].kioskDetails[0].city,
                'minimumOrder': product[0].minimumOrder.total,
                'isWholesalePrice': product[0].isWholesalePrice,
                'isChecked': true,
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                }
            });
            // console.log(response.data)
        } catch (e) {
            console.log(e)
            console.log(e.response.data)
        }
    }

    const handleAddWishlist = async () => {
        try {
            let response = await axios.patch('https://server.seafreshing.com/api/user/add-wishlist', {
                'id': userData.id,
                'productId': match.params.id,
                'image': product[0].image[0].imgUrl,
                'name': product[0].productName,
                'price': product[0].price.value,
                'rating': '',
                'productQuantity': quantity,
                'priceUnit': "Kg",
                'kioskName': product[0].kioskName,
                'kioskId': product[0].kioskId,
                'idUser': userData.id,
                'kioskCity': product[0].kioskDetails[0].city,
                'minimumOrder': product[0].minimumOrder.total,
                'isWholesale': product[0].isWholesalePrice,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                }
            });
            console.log(response.data)
        } catch (e) {
            console.log(e)
            console.log(e.response.data)
        }
    }

    return (
        <>
            {
                token ?
                    <HeaderHS />
                    :
                    <Header />
            }
            {
                product[0] ?
                    <div class="bg-white">
                        <div class="pt-6 pb-16 sm:pb-24">

                            <div class="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                <div class="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                                    <div class="lg:col-start-8 lg:col-span-5">
                                        <div class="flex justify-between">
                                            <h1 class="text-xl font-medium text-gray-900">{product[0].productName}</h1>
                                            <p class="text-xl font-medium text-gray-900">{product[0].price.value}</p>
                                        </div>
                                        <div class="mt-4">
                                            <h2 class="sr-only">Reviews</h2>
                                            <div class="flex items-center">
                                                <p class="text-sm text-gray-700">
                                                    3.9
                                                    <span class="sr-only"> out of 5 stars</span>
                                                </p>
                                                <div class="ml-1 flex items-center">

                                                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>

                                                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>

                                                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>

                                                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>

                                                    <svg class="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                </div>
                                                <div aria-hidden="true" class="ml-4 text-sm text-gray-300">·</div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                                        <h2 class="sr-only">Images</h2>

                                        <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                            <img src={product[0].image[0].imgUrl} alt={product.productName} class="lg:col-span-2 lg:row-span-2 rounded-lg" />
                                        </div>
                                    </div>

                                    <div class="mt-8 lg:col-span-5">
                                        <form>
                                            <div>
                                                <h2 class="text-sm font-medium text-gray-900">Qty</h2>

                                                <fieldset class="mt-2">
                                                    <legend class="sr-only">Qty</legend>
                                                    <div>
                                                        <div class="mt-1 relative rounded-md shadow-sm">
                                                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <span class="text-gray-500 sm:text-sm"> </span>
                                                            </div>
                                                            <input type="text" name="price" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0" />
                                                            <div class="absolute inset-y-0 right-0 flex items-center">
                                                                <label for="currency" class="sr-only">Qty</label>
                                                                <select id="currency" name="currency" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                                                                    <option>Kg</option>
                                                                    <option>Kwintal</option>
                                                                    <option>Ton</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>

                                            <div class="mt-10">
                                                <h2 class="text-sm font-medium text-gray-900">Description</h2>

                                                <div class="mt-4 prose prose-sm text-gray-500">
                                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae.</p>
                                                </div>
                                            </div>

                                            <button type="submit" class="mt-8 w-full bg-sky-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Add to cart</button>
                                        </form>


                                        <div class="mt-8 border-t border-gray-200 pt-8">
                                            <div class="relative pb-8">
                                                <div class="relative flex items-start space-x-3">
                                                    <div class="relative">
                                                        <img class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" src={product[0].kioskPicture} alt="" />

                                                        <span class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">


                                                            <img class="h-12 w-12 rounded-full" src={product[0].kioskPicture} alt="" />
                                                            <span class="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-300"></span>

                                                        </span>
                                                    </div>
                                                    <div class="min-w-0 flex-1">
                                                        <div>
                                                            <div class="text-sm">
                                                                <a href="#" class="font-medium text-gray-900">{product[0].kioskName}</a>
                                                            </div>
                                                            <p class="mt-0.5 text-sm text-gray-500">Actived 2h ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : "Loading..."
            }
            <TrendingProduct />
            <Footer />
        </>
    );
};

export default SingleProduct;
