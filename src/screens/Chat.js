

const Chat = () => {
    return (
        <div class="w-screen">
            <div class="grid grid-cols-3 min-w-full border rounded" style="min-height: 80vh;">
                <div class="col-span-1 bg-white border-r border-gray-300">
                    <div class="my-3 mx-3 ">
                        <div class="relative text-gray-600 focus-within:text-gray-400">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </span>
                            <input aria-placeholder="Busca tus amigos o contacta nuevos" placeholder="Busca tus amigos"
                                class="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700" type="search" name="search" required autocomplete="search" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}