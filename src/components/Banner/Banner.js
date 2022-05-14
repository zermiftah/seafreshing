const Banner = () => {
    return (
        <header class="bg-white dark:bg-gray-800">

            <div class="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                <div class="w-full lg:w-1/2">
                    <div class="lg:max-w-lg">
                        <h1 class="text-2xl font-medium tracking-wide text-gray-800 dark:text-white lg:text-4xl">Find your premium new seafood from Jakarta</h1>
                        <p class="mt-2 text-gray-600 dark:text-gray-300">We work with the best call storage in Muara Angke and Muara Baru to find your new seafood.</p>
                        <div class="grid gap-6 mt-8 sm:grid-cols-2">
                            <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>

                                <span class="mx-3">Premium Seafood</span>
                            </div>

                            <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>

                                <span class="mx-3">Insurance</span>
                            </div>

                            <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>

                                <span class="mx-3">All legal seafoods</span>
                            </div>

                            <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>

                                <span class="mx-3">From Jakarta</span>
                            </div>

                            <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>

                                <span class="mx-3">Payment Security</span>
                            </div>

                            <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>

                                <span class="mx-3">Fast shipping </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-center w-full h-96 lg:w-1/2">
                    <img class="object-cover w-full h-full max-w-2xl rounded-md" src="https://cdn.vectorstock.com/i/1000x1000/80/60/production-line-canned-fish-and-preserves-vector-38868060.webp" alt="glasses photo" />
                </div>
            </div>
        </header>
    );
}

export default Banner;