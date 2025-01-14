
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, PlusSmIcon } from '@heroicons/react/solid'
import axios from 'axios';
import { Link } from 'react-router-dom';

const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }]
const filters = [
    {
        id: 'Filters',
        name: 'Filters',
        options: [
            { value: 'Most Expensive', label: 'Most Expensive' },
            { value: 'Most inexpensive', label: 'Most inexpensive' },
            { value: 'Best Seller', label: 'Best Seller' },
            { value: 'Daily Fresh', label: 'Daily Fresh' },
            { value: 'Frozen', label: 'Frozen' },
        ],
    },

]
const products = [
    {
        id: 1,
        name: 'Ikan Tenggiri',
        href: '#',
        price: 'Rp.250.000',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores.',
        options: '8 stocks',
        imageSrc: 'https://dahliagroup.co.id/wp-content/uploads/2019/11/6.-Ikan-Tenggri-segar.jpg',
        imageAlt: '',
    },
    {
        id: 2,
        name: 'Ikan Kakap',
        href: '#',
        price: 'Rp.320.000',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores.',
        options: '10 stocks',
        imageSrc: 'https://img.freepik.com/free-photo/top-view-raw-fish-tomatoes-lemon-slices-table-free-space_179666-46495.jpg?t=st=1651846661~exp=1651847261~hmac=6c361f06cae74352125f2a96f2cebea4baa82e76a858ececec52b9047c9a6fcd&w=1060',
        imageAlt: '',
    },
    {
        id: 1,
        name: 'Gurita Segar',
        href: '#',
        price: 'Rp.250.000',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores.',
        options: '8 stocks',
        imageSrc: 'https://img.freepik.com/free-photo/octopus-tentacles-hang-from-tray_296586-5365.jpg?w=1060',
        imageAlt: '',
    },
    {
        id: 1,
        name: 'Udang',
        href: '#',
        price: 'Rp.250.000',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores.',
        options: '8 stocks',
        imageSrc: 'https://img.freepik.com/free-photo/close-up-raw-shrimps-wooden-background_127675-2694.jpg?t=st=1651846934~exp=1651847534~hmac=fae2f4974af0245578daffd8c54da4941a31965b5be7db986b0599d3322f03e7&w=1060',
        imageAlt: '',
    },
    // More products...
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Wishlist() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const token = JSON.parse(localStorage.getItem('token'));
    const userData = JSON.parse(localStorage.getItem('user-data'));
    const [getWishlist, setWishlist] = useState([]);

    useEffect(() => {
        getWishlistData();
    }, [])

    const getWishlistData = async () => {
        try {
            let response = await axios.get(`https://server.seafreshing.com/api/user/get-wishlist/${userData.accounttype}/${userData.id}`, {
                headers: {
                    'auth-token': token,
                }
            });
            setWishlist(response.data.wishlist)
            console.log(response.data)
        } catch (e) {
            console.log(e)
            console.log(e.response)
        }
    }

    return (
        <div className="bg-white">

            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                                <div className="px-4 flex items-center justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4">
                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.name} className="border-t border-gray-200 pt-4 pb-4">
                                            {({ open }) => (
                                                <fieldset>
                                                    <legend className="w-full px-2">
                                                        <Disclosure.Button className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                            <span className="text-sm font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 h-7 flex items-center">
                                                                <ChevronDownIcon
                                                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </Disclosure.Button>
                                                    </legend>
                                                    <Disclosure.Panel className="pt-4 pb-2 px-4">
                                                        <div className="space-y-6">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`${section.id}-${optionIdx}-mobile`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`${section.id}-${optionIdx}-mobile`}
                                                                        className="ml-3 text-sm text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </fieldset>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>


                <main className="max-w-2xl mx-auto px-4 lg:max-w-7xl lg:px-8">
                    <div className="border-b border-gray-200 pt-24 pb-10">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Wishlist</h1>
                        <p className="mt-4 text-base text-gray-500">
                            Immediately freeze the fresh seafoods you have!
                        </p>
                    </div>

                    <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                        <aside>
                            <h2 className="sr-only">Filters</h2>

                            <button
                                type="button"
                                className="inline-flex items-center lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="text-sm font-medium text-gray-700">Filters</span>
                                <PlusSmIcon className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </button>

                            <div className="hidden lg:block">
                                <form className="divide-y divide-gray-200 space-y-10">
                                    {filters.map((section, sectionIdx) => (
                                        <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                                            <fieldset>
                                                <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                                                <div className="pt-6 space-y-3">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                id={`${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                type="checkbox"
                                                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>
                                    ))}
                                </form>
                            </div>
                        </aside>

                        <section aria-labelledby="product-heading" className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
                            <h2 id="product-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                                {
                                    getWishlist.map(item => (
                                        item.wishlist.length === 0 ?
                                            <span>There is no data here</span>
                                            :
                                            item.wishlist.map(product => (
                                                <div
                                                    key={product.id}
                                                    className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
                                                >
                                                    <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                                                        <img
                                                            src={product.image}
                                                            className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                                                        />
                                                    </div>
                                                    <div className="flex-1 p-4 space-y-2 flex flex-col">
                                                        <h3 className="text-sm font-medium text-gray-900">
                                                            <Link to={`/DetailProduct/${product.id}`}><span aria-hidden="true" className="absolute inset-0" />{product.name}</Link>
                                                        </h3>
                                                        <p className="text-sm text-gray-500">{product.description}</p>
                                                        <div className="flex-1 flex flex-col justify-end">
                                                            <p className="text-sm italic text-gray-500">{product.kioskName}</p>
                                                            <p className="text-base font-medium text-gray-900">{product.price + ' ' + product.priceUnit}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    ))
                                }
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}
