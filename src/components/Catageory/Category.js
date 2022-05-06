
import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import axios from "axios";

const categories = [
    {
        name: 'All',
        href: '#',
        imageSrc: 'https://img.freepik.com/free-photo/top-view-crab-mussels-pan-with-shrimp_23-2148643653.jpg?w=1060',
    },
    {
        name: 'Fish',
        href: '#',
        imageSrc: 'https://img.freepik.com/free-photo/black-sea-bluefish-black-fish-pattern-with-space-text_91908-516.jpg?w=1060',
    },
    {
        name: 'Mussel',
        href: '#',
        imageSrc: 'https://img.freepik.com/free-photo/shells-clams-vongole-wooden-cutting-board_89816-23153.jpg?w=1060',
    },
    {
        name: 'Shrimp',
        href: '#',
        imageSrc: 'https://img.freepik.com/free-photo/raw-shrimps-with-lemon-cherry-tomato-light-plate-copy-space-top-view-appetizing-seafood-snack-restaurant-serving_116547-14482.jpg?w=1060',
    },
    { name: 'Item', href: '#', imageSrc: 'https://img.freepik.com/free-photo/showcase-with-raw-fish_171337-2422.jpg?t=st=1651806956~exp=1651807556~hmac=47fe8930155e7fa3ff915d656f5382c3b4c810bd9210c2a643c76a0a8abe4a14&w=1060' },
]


const sortOptions = [
    { name: 'Most Expensive', href: '#' },
    { name: 'Most inexpensive', href: '#' },
    { name: 'Best Seller', href: '#' },
    { name: 'Daily Fresh', href: '#' },
    { name: 'Frozen', href: '#' },


]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Category = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchproducts = async () => {
            const data = await axios.get("http://103.102.152.201:3001/api/product/get-all-product?page=1=&limit=10")
            let temp = data.data.product.results
            setProducts(temp)
        }
        fetchproducts()
    }, []);

    const Page = (items) => Math.ceil(items.length / 10);

    return (
        <div className="bg-white">
            <div className="py-16 sm:py-24 xl:max-w-7xl xl:mx-auto xl:px-8">
                <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Shop by Category</h2>
                </div>

                <div className="mt-4 flow-root">
                    <div className="-my-2">
                        <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                            <div className="absolute min-w-screen-xl px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                                {categories.map((category) => (
                                    <a
                                        key={category.name}
                                        href={category.href}
                                        className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
                                    >
                                        <span aria-hidden="true" className="absolute inset-0">
                                            <img src={category.imageSrc} alt="" className="w-full h-full object-center object-cover" />
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                                        />
                                        <span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50">
                    {/* Mobile filter dialog */}
                    <div className="max-w-3xl mx-auto px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
                        <section aria-labelledby="filter-heading" className="border-t border-gray-200 py-6">
                            <div className="flex items-center justify-between">
                                <Menu as="div" className="relative z-10 inline-block text-left">
                                    <div>
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sort
                                            <ChevronDownIcon
                                                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {sortOptions.map((option) => (
                                                    <Menu.Item key={option}>
                                                        {({ active }) => (
                                                            <a
                                                                href={option.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm font-medium text-gray-900'
                                                                )}
                                                            >
                                                                {option.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </section>
                        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                            {products.map((product) => (
                                <div key={product.id}>
                                    <div className="relative">
                                        <div className="relative w-full h-72 rounded-lg overflow-hidden">
                                            <img
                                                src={product.image[0].imgUrl}
                                                alt={product.productName}
                                                className="w-full h-full object-center object-cover"
                                            />
                                        </div>
                                        <div className="relative mt-4">
                                            <h3 className="text-sm font-medium text-gray-900">{product.productName}</h3>
                                            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                        </div>
                                        <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                                            <div
                                                aria-hidden="true"
                                                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                            />
                                            <p className="relative text-lg font-semibold text-white">{product.price.value}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                            </svg>
                                            <span class="mx-1">Add to freezer</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Category;
