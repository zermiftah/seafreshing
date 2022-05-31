const Banner = () => {
    return (

        // <div class="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
        //     <div class="w-full lg:w-1/2">
        //         <div class="lg:max-w-lg">
        //             <h1 class="text-2xl font-medium tracking-wide text-gray-800 dark:text-white lg:text-4xl">Find your premium new seafood from Jakarta</h1>
        //             <p class="mt-2 text-gray-600 dark:text-gray-300">We work with the best call storage in Muara Angke and Muara Baru to find your new seafood.</p>
        //             <div class="grid gap-6 mt-8 sm:grid-cols-2">
        //                 <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
        //                     <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        //                     </svg>

        //                     <span class="mx-3">Premium Seafood</span>
        //                 </div>

        //                 <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
        //                     <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        //                     </svg>

        //                     <span class="mx-3">Insurance</span>
        //                 </div>

        //                 <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
        //                     <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        //                     </svg>

        //                     <span class="mx-3">All legal seafoods</span>
        //                 </div>

        //                 <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
        //                     <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        //                     </svg>

        //                     <span class="mx-3">From Jakarta</span>
        //                 </div>

        //                 <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
        //                     <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        //                     </svg>

        //                     <span class="mx-3">Payment Security</span>
        //                 </div>

        //                 <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
        //                     <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        //                     </svg>

        //                     <span class="mx-3">Fast shipping </span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <div class="flex items-center justify-center w-full h-96 lg:w-1/2">
        //         <img class="object-cover w-full h-full max-w-2xl rounded-md" src="https://img.freepik.com/free-vector/seafood-menu-background-with-fish-steak-lobster-spices_1284-14068.jpg?t=st=1653963653~exp=1653964253~hmac=b706cb78fef98b275ffc4fad431bd9313f41c54d647068d04d57e7eba19a81b7&w=740" alt="glasses photo" />
        //     </div>
        // </div>
        <div className="relative bg-white overflow-hidden">
            <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
                    <div className="sm:max-w-lg">
                        <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                            Fresh Seafood are finally here
                        </h1>
                        <p className="mt-4 text-xl text-gray-500">
                            We work with the best call storage in Muara Angke and Muara Baru to find your new seafood.
                        </p>
                    </div>
                    <div>
                        <div className="mt-10">
                            {/* Decorative image grid */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                            >
                                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                    <div className="flex items-center space-x-6 lg:space-x-8">
                                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                                                <img
                                                    src="https://img.freepik.com/free-photo/fresh-lobster_282791-85.jpg?w=360"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-photo/mussels-creamy-garlic-sauce-black-metal-plate-wooden-board_182615-2558.jpg?w=360"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-photo/bbq-roasted-giant-shrimps-langoustine-grill-with-herbs-dark-background-top-view_89816-38284.jpg?w=360"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-photo/assortment-healthy-sea-food_23-2148926813.jpg?t=st=1653981659~exp=1653982259~hmac=4a867da6780b47330b27743c16ef2515e4f93c350805e19c048da4484ab3428f&w=360"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-photo/fresh-open-oyster-with-lemon-plate-with-ice-sauce-dark-kitchen-table-seafood-appetizer_347988-359.jpg?w=740"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-photo/vertical-view-scales-removed-fresh-fish-tomatoes-different-spices-dark-color-background_140725-160330.jpg?t=st=1653981753~exp=1653982353~hmac=5340326d0bc4588344b7972aadad02a5eaaa3ada4cc51bcc8cda65dd3958c862&w=360"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-photo/indian-mackerel-rastrelliger-kanagurta_1205-2582.jpg?t=st=1653982081~exp=1653982681~hmac=7c46de41ea321c6bbeedc378512097d7b4ad7fba99c5713a9f5800aaf99c6f0f&w=1060"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="#"
                                className="inline-block text-center bg-slate-200 border border-transparent rounded-md py-3 px-8 font-medium text-black hover:bg-slate-300"
                            >
                                Fresh Collection
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Banner;