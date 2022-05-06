

const TrendingProduct = () => {
    return (
        <div class="bg-white">
            <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Trending products</h2>

                <div class="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <a href="#" class="group">
                        <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                            <img src="https://dahliagroup.co.id/wp-content/uploads/2019/11/6.-Ikan-Tenggri-segar.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="w-full h-full object-center object-cover group-hover:opacity-75" />
                        </div>
                        <h3 class="mt-4 text-sm text-gray-700">Ikan Tenggiri</h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">Rp.170.000</p>
                    </a>

                    <a href="#" class="group">
                        <div class="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                            <img src="https://dahliagroup.co.id/wp-content/uploads/2019/11/10.-Ikan-Layur-Segar.jpg" alt="Olive drab green insulated bottle with flared screw lid and flat top." class="w-full h-full object-center object-cover group-hover:opacity-75" />
                        </div>
                        <h3 class="mt-4 text-sm text-gray-700">Ikan Layur</h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">Rp.150.000</p>
                    </a>

                    <a href="#" class="group">
                        <div class="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                            <img src="https://doktersehat.com/wp-content/uploads/2020/03/manfaat-ikan-kakap-doktersehat.jpg" alt="Person using a pen to cross a task off a productivity paper card." class="w-full h-full object-center object-cover group-hover:opacity-75" />
                        </div>
                        <h3 class="mt-4 text-sm text-gray-700">Ikan Kakap</h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">Rp.200.000</p>
                    </a>

                    <a href="#" class="group">
                        <div class="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                            <img src="https://nilaigizi.com/assets/images/produk/produk_1535640905.jpeg" alt="Hand holding black machined steel mechanical pencil with brass tip and top." class="w-full h-full object-center object-cover group-hover:opacity-75" />
                        </div>
                        <h3 class="mt-4 text-sm text-gray-700">Ikan Hiu</h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">Rp.600.000</p>
                    </a>

                </div>
            </div>
        </div>
    )
}

export default TrendingProduct;

