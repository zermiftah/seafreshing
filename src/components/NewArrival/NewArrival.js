
const NewArrival = () => {
    return (
        <section class="bg-white dark:bg-gray-900">
            {/* <div class="container px-6 py-8 mx-auto ">
                <div class="lg:flex lg:-mx-2 items-center justify-center ">
                    <div class="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                        <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">New Arrival</h2>
                        </div>
                        <div class="flex items-center justify-between text-sm tracking-widest uppercase ">
                            <p class="mt-3 text-gray-500 dark:text-gray-300">4 Items</p>
                        </div>

                        <div class="grid grid-cols-1 gap-8  mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                            <div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                                <img class="object-cover w-full rounded-md h-72 xl:h-80" src="https://previews.123rf.com/images/yelenayemchuk/yelenayemchuk1804/yelenayemchuk180400072/98705622-salmon-fresh-salmon-fish-raw-salmon-fish-fillet.jpg?fj=1" alt="T-Shirt" />
                                <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">Salmon Fillet</h4>
                                <p class="text-blue-500">Rp.350.000</p>

                                <button class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span class="mx-1">Add to freezer</span>
                                </button>
                            </div>

                            <div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                                <img class="object-cover w-full rounded-md h-72 xl:h-80" src="https://dahliagroup.co.id/wp-content/uploads/2019/11/11.-Ikan-kurisi-segar.jpg" alt="T-Shirt" />
                                <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200"> Kurisi Merah</h4>
                                <p class="text-blue-500">Rp.200.000</p>

                                <button class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span class="mx-1">Add to freezer</span>
                                </button>
                            </div>

                            <div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                                <img class="object-cover w-full rounded-md h-72 xl:h-80" src="https://dahliagroup.co.id/wp-content/uploads/2019/11/19.-Bulu-Babi-atau-landak-laut.jpg" alt="T-Shirt" />
                                <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">Bulu Babi</h4>
                                <p class="text-blue-500">Rp.200.000</p>

                                <button class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span class="mx-1">Add to freezer</span>
                                </button>
                            </div>

                            <div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                                <img class="object-cover w-full rounded-md h-72 xl:h-80" src="https://dahliagroup.co.id/wp-content/uploads/2019/11/2.-Ikan-Kerapu-Segar.jpg" alt="T-Shirt" />
                                <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">Ikan Kerapu</h4>
                                <p class="text-blue-500">Rp.250.000</p>

                                <button class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span class="mx-1">Add to freezer</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="bg-white">
                <div className="relative bg-gray-900">
                    {/* Decorative image and overlay */}
                    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                        <img
                            src="https://img.freepik.com/free-photo/composition-with-frozen-fish-table_23-2148969392.jpg?t=st=1651834450~exp=1651835050~hmac=67c96fbb604389bf795f5c14b27fd0649a9ea1dfa48a6d3950680b42a7c29a23&w=1380"
                            alt=""
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                    <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

                    <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">New arrivals are here</h1>
                        <p className="mt-4 text-xl text-white">
                            The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release
                            while they're still in stock.
                        </p>
                        <a
                            href="#"
                            className="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
                        >
                            Shop New Arrivals
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewArrival;