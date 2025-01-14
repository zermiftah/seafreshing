import { useEffect, useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Notif from '../components/simple'
// import Reviews from "../components/Reviews/Reviews";


function convertToAngka(rupiah) {
    return parseInt(rupiah.replace(/,.*|[^0-9]/g, ''), 10);
}
export default function DetailProduct() {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const userData = JSON.parse(localStorage.getItem('user-data'));
    const token = JSON.parse(localStorage.getItem('token'));
    const [notif, setNotif] = useState('');
    const { id } = useParams();
    const [show, setShow] = useState(true)

    useEffect(() => {
        getProduct();
    }, [])
    const getProduct = async () => {
        try {
            const data = await axios.get(`https://server.seafreshing.com/api/product/get-product/${id}`)
            let temp = data.data.product;

            setProduct(temp)

        } catch (e) {
            console.log(e.response.data)
            console.log(e.response)
        }
    }


    const handleAddToCart = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.patch('https://server.seafreshing.com/api/user/add-freezer', JSON.stringify({

                "isWholesale": true,
                "quantityWholesaleReal": 0,
                "idUser": userData.id,
                "kioskId": product[0].kioskId,
                "productId": id,
                "clearPrice": convertToAngka(product[0].price.value),
                "name": product[0].productName,
                "price": product[0].price.value,
                "minimumOrder": {
                    "total": product[0].minimumOrder.total,
                    "unit": "kg"
                },
                "image": product[0].image[0].imgUrl,
                "priceUnit": "kg",
                "productQuantity": 1,
                "isWholesalePrice": false,
                "unitWholesale": "kg",
                "priceWholesale": 1,
                "isChecked": true,
                "latLng": "",
                "packingVariant": {
                    "isCheck": true,
                    "packingDimensions": {
                        "height": 10,
                        "length": 10,
                        "weight": {
                            "unit": "kg",
                            "value": "1"
                        },
                        "width": 10
                    },
                    "packingName": product[0].packingVariant[0].packingName
                },
                "variant": ""

            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                }
            });
            console.log(response.data)
            if (response.data) {
                setNotif(response.data.msg)
            }
        } catch (e) {
            console.log(e)
            console.log(e.response.data)
        }
    }

    const handleAddWishlist = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.patch('https://server.seafreshing.com/api/user/add-wishlist',
                {
                    "isWholesale": true,
                    "quantityWholesaleReal": 0,
                    "idUser": "NiE4X6f8jxea",
                    "kioskId": "QmlLzQ2VuHhH",
                    "productId": "CWleYKPPC8ZG",
                    "clearPrice": 43000,
                    "name": "Cumi",
                    "price": "Rp43.000",
                    "minimumOrder": {
                        "total": 1,
                        "unit": "kg"
                    },
                    "image": "https://server.seafreshing.com/public/uploads/9cd266b1e030f75da986fed341b61ad7.JPG",
                    "priceUnit": "kg",
                    "productQuantity": 12,
                    "isWholesalePrice": false,
                    "unitWholesale": "kg",
                    "priceWholesale": 20,
                    "isChecked": true,
                    "latLng": "",
                    "packingVariant": {
                        "isCheck": true,
                        "packingDimensions": {
                            "height": 10,
                            "length": 10,
                            "weight": {
                                "unit": "kg",
                                "value": "2"
                            },
                            "width": 10
                        },
                        "packingName": "Carton"
                    },
                    "variant": ""
                }
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                }).then((res) => {
                    console.log(res)
                }).catch((err) => { console.log(err) });
            if (response.data) {
                setNotif(response.data.msg)
            }
        } catch (e) {
            console.log(e)
            console.log(e.response.data)
        }
    }

    return (
        <>
            {
                notif && (
                    <Notif show={show} close={() => setShow(false)} title="Success" text={notif} />
                )
            }
            {
                product[0] ?
                    <div class="bg-white">
                        <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                            <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                                <div class="flex flex-col-reverse">
                                    <div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                                        <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
                                            <button id="tabs-1-tab-1" class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50" aria-controls="tabs-1-panel-1" role="tab" type="button">
                                                <span class="sr-only"> Angled view </span>
                                                <span class="absolute inset-0 rounded-md overflow-hidden">
                                                    <img src={product[0].image[0].imgUrl} alt="" class="w-full h-full object-center object-cover" />
                                                </span>


                                                <span class="ring-transparent absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none" aria-hidden="true"></span>
                                            </button>

                                        </div>
                                    </div>

                                    <div class="w-full aspect-w-1 aspect-h-1">
                                        <div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
                                            <img src={product[0].image[0].imgUrl} alt="Angled front view with bag zipped and handles upright." class="w-full h-full object-center object-cover sm:rounded-lg" />

                                        </div>

                                    </div>

                                </div>
                                <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                                    <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{product[0].productName}</h1>

                                    <div class="mt-3">
                                        <h2 class="sr-only">Product information</h2>
                                        <p class="text-3xl text-gray-900">{product[0].price.value}</p>
                                    </div>
                                    <div class="mt-3">
                                        <h3 class="sr-only">Reviews</h3>
                                        <div class="flex items-center">
                                            <div class="flex items-center">
                                                <svg class="h-5 w-5 flex-shrink-0 text-slate-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg class="h-5 w-5 flex-shrink-0 text-slate-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg class="h-5 w-5 flex-shrink-0 text-slate-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg class="h-5 w-5 flex-shrink-0 text-slate-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg class="h-5 w-5 flex-shrink-0 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                            <p class="sr-only">4 out of 5 stars</p>
                                        </div>
                                    </div>

                                    <div class="mt-6">
                                        <h3 class="sr-only">Description</h3>

                                        <div class="text-base text-gray-700 space-y-6">
                                            <p>{product[0].productDescription}</p>
                                        </div>
                                    </div>

                                    <form class="mt-6">
                                        <h2 className='font-bold'>Packing Variant</h2>

                                        <div className='flex gap-2 '>
                                            {product[0].packingVariant.map((variant) => (
                                                <div className='mt-3 w-full' onClick={() => { console.log('test') }}>
                                                    <h6 className='font-bold'>{variant.packingName}</h6>
                                                    <div className="max-w-sm rounded overflow-hidden shadow-sm border-2">
                                                        <div className="px-6 py-4 text-gray">
                                                            <p className='text-gray-500'>Content : {variant.packingDimensions.weight.value + " " + variant.packingDimensions.weight.unit}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className='mt-3 w-full ml-1'>
                                                <h6 className='font-bold '>Detail Product</h6>
                                                <div className=" rounded overflow-hidden  ">
                                                    <div className="  py-4 text-gray-500">
                                                        <p>Min. order : {product[0].minimumOrder.total + " " + product[0].minimumOrder.unit}</p>
                                                        <p className='mt-1'>Category : {product[0].category}</p>
                                                        <p className='mt-1'>{product[0].productDescription}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-10 flex sm:flex-col1">
                                            <button onClick={handleAddToCart} class="max-w-xs flex-1 bg-slate-200 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-black hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-slate-800 sm:w-full">Add to freezer</button>

                                            <button onClick={handleAddWishlist} class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                                <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                <span class="sr-only">Add to Wishlist</span>
                                            </button>
                                        </div>
                                    </form>
                                    <div class="mt-8 border-t border-gray-200 pt-8">
                                        <div class="relative pb-8">
                                            <div class="relative flex items-start space-x-3">
                                                <div class="relative">
                                                    <img class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" src={product[0].kioskPicture} alt="" />

                                                    <span class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">


                                                        <img class="h-12 w-12 rounded-full" src={product[0].kioskPicture} alt="" />
                                                        <span class="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-600"></span>

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
                    : "Loading..."
            }
        </>
    )
}
