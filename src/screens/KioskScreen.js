import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import Notif from '../components/simple';
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, PlusSmIcon } from '@heroicons/react/solid'


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

const KioskScreen = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const userData = JSON.parse(localStorage.getItem('user-data'));
  const [notif, setNotif] = useState({
    error: '',
    success: '',
  });
  const token = JSON.parse(localStorage.getItem('token'));
  const [getKName, setKName] = useState([]);
  const [getDName, setDName] = useState([]);
  const [kioskName, setKioskName] = useState('');
  const [kioskDomain, setKioskDomain] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);
  const [prov, setProv] = useState('');
  const [reg, setReg] = useState('');
  const [dist, setDist] = useState('');
  const [vill, setVill] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [getKiosk, setKiosk] = useState([]);
  const qs = require('qs');
  const [show, setShow] = useState(true)
  
  useEffect(() => {
    getKioskName();
  }, [kioskName])

  const getKioskName = async () => {
    try {
      let response = await axios.get(`https://server.seafreshing.com/api/kiosk/check-name/${kioskName}`)
      setKName(response.data);
    } catch (e) {
      if (e) {
        console.log(e)
      } else if (e.response.data) {
        console.log(e.response.data)
      }
    }
  }

  useEffect(() => {
    getDomainName();
  }, [kioskDomain])

  const getDomainName = async () => {
    try {
      let response = await axios.get(`https://server.seafreshing.com/api/kiosk/check-domain/${kioskDomain}`)
      setDName(response.data);
    } catch (e) {
      if (e) {
        console.log(e)
      } else if (e.response.data) {
        console.log(e.response.data)
      }
    }
  }

  useEffect(() => {
    getProvince();
  }, [])

  const getProvince = async () => {
    try {
      let response = await axios.get('https://server.seafreshing.com/api/list/province')
      setProvince(response.data);
    } catch (e) {
      if (e) {
        console.log(e)
      } else if (e.response.data) {
        console.log(e.response.data)
      }
    }
  }

  useEffect(() => {
    getRegencies();
  }, [prov])

  const getRegencies = async () => {
    try {
      let response = await axios.get(`https://server.seafreshing.com/api/list/regencies/${prov}`)
      setRegencies(response.data);
    } catch (e) {
      if (e) {
        console.log(e)
      } else if (e.response.data) {
        console.log(e.response.data)
      }
    }
  }

  useEffect(() => {
    getDisctrict();
  }, [reg])

  const getDisctrict = async () => {
    try {
      let response = await axios.get(`https://server.seafreshing.com/api/list/districts/${reg}`)
      setDistrict(response.data);
    } catch (e) {
      if (e) {
        console.log(e)
      } else if (e.response.data) {
        console.log(e.response.data)
      }
    }
  }

  useEffect(() => {
    getVillages();
  }, [dist])

  const getVillages = async () => {
    try {
      let response = await axios.get(`https://server.seafreshing.com/api/list/villages/${dist}`)
      setVillage(response.data);
    } catch (e) {
      if (e) {
        console.log(e)
      } else if (e.response.data) {
        console.log(e.response.data)
      }
    }
  }

  const handleCreateKiosk = async (e) => {
    e.preventDefault();

    let city = regencies.find(id => id.id === reg);
    let dstrct = district.find(id => id.id === dist);
    let vllgs = village.find(id => id.id === vill);
    let prvnc = province.find(id => id.id === prov);
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let data = new FormData();
    data.append('name', kioskName);
    data.append('domain', kioskDomain);
    data.append('search', kioskName);
    data.append('fullAddress', address);
    data.append('city', city.name);
    data.append('zipcode', zipcode);
    data.append('district', dstrct.name);
    data.append('villages', vllgs.name);
    data.append('province', prvnc.name);
    data.append('mobilenumber', mobilenumber);
    data.append('joinTime', date)
    data.append('userId', userData.id)

    try {
      let response = await axios.post('https://server.seafreshing.com/api/kiosk/open-kiosk', data, {
        headers: {
          'auth-token': token,
        }
      })
      if (response.data) {
        let kioskDt = new FormData();
        kioskDt.append('userid', userData.id);
        kioskDt.append('id', response.data.kiosk.id);

        try {
          let res = await axios.post('https://server.seafreshing.com/api/user/set-kiosk', kioskDt, {
            headers: {
              'auth-token': token,
            }
          })
          console.log(res.data)
        } catch(e) {
          console.log(e.res.data)
        }
      }
    } catch (e) {
      if (e) {
        console.log(e)
        console.log(e.response.data)
      } else if (e.response.data) {
        console.log(e.response.data)
      }
    }
  }

  useEffect(() => {
    getKioskProduct();
  }, [userData.kioskid])

  const getKioskProduct = async () => {
    try {
      let response = await axios.get(`https://server.seafreshing.com/api/kiosk/get-kiosk/${userData.kioskid}`)
      setKiosk(response.data)
    } catch (e) {
      console.log(e)
      console.log(e.response.data)
    }
  }

  return (
    <>
      {
        !kioskName ?
          ""
          :
          getKName ?
            getKName.code === 10 ?
              <Notif show={show} close={() => setShow(false)} title='Error' text={getKName.msg} />
              :
              <Notif show={show} close={() => setShow(false)} title='Success' text={getKName.msg} />
            : ""
      }
      {
        !kioskDomain ?
          ""
          :
          getDName ?
            getDName.code === 10 ?
              <Notif show={show} close={() => setShow(false)} title='Error' text={getDName.msg} />
              :
              <Notif show={show} close={() => setShow(false)} title='Success' text={getDName.msg} />
            : ""
      }
      {
        notif.success && (
          <Notif show={show} close={() => setShow(false)} title={notif.success} text="Data has been saved!" />
        )
      }
      {
        notif.error && (
          <Notif show={show} close={() => setShow(false)} title='Error' text={notif.error} />
        )
      }
      {
        getKiosk.length === 0 ?
          <>
            <div className="mt-10 sm:mt-0 container px-6 py-3 mx-auto">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                    <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                  </div>
                </div>

                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form onSubmit={handleCreateKiosk}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">

                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                              Kiosk Name
                            </label>
                            <input
                              value={kioskName} onChange={(e) => setKioskName(e.target.value)}
                              type="text"
                              required
                              autoComplete="given-name"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                              Kiosk Domain
                            </label>
                            <input
                              value={kioskDomain} onChange={(e) => setKioskDomain(e.target.value)}
                              type="text"
                              autoComplete="email"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          {
                            getKName && getDName ?
                              getKName.code === 200 && getDName.code === 200 ?
                                <>
                                  <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                      Full Address
                                    </label>
                                    <input
                                      value={address} onChange={(e) => setAddress(e.target.value)}
                                      type="text"
                                      autoComplete="email"
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                      Provinsi
                                    </label>
                                    {
                                      province.length === 0 ?
                                        <label>No data</label>
                                        :
                                        <select value={prov} onChange={(e) => setProv(e.target.value)} required>
                                          <option selected>Open this select menu</option>
                                          {
                                            province.map(province => (
                                              <option key={province.id} value={province.id}>{province.name}</option>
                                            ))
                                          }
                                        </select>
                                    }
                                  </div>
                                  {
                                    prov && (
                                      <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                          Kota
                                        </label>
                                        {
                                          regencies.length === 0 ?
                                            <label>No data</label>
                                            :
                                            <select value={reg} onChange={(e) => setReg(e.target.value)} required>
                                              <option selected>Open this select menu</option>
                                              {
                                                regencies.map(regencies => (
                                                  <option key={regencies.id} value={regencies.id}>{regencies.name}</option>
                                                ))
                                              }
                                            </select>
                                        }
                                      </div>
                                    )
                                  }
                                  {
                                    reg && (
                                      <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                          Kecamatan
                                        </label>
                                        {
                                          district.length === 0 ?
                                            <label>No data</label>
                                            :
                                            <select value={dist} onChange={(e) => setDist(e.target.value)} required>
                                              <option selected>Open this select menu</option>
                                              {
                                                district.map(district => (
                                                  <option key={district.id} value={district.id}>{district.name}</option>
                                                ))
                                              }
                                            </select>
                                        }
                                      </div>
                                    )
                                  }
                                  {
                                    dist && (
                                      <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                          Kelurahan
                                        </label>
                                        {
                                          village.length === 0 ?
                                            <label>No data</label>
                                            :
                                            <select value={vill} onChange={(e) => setVill(e.target.value)} required>
                                              <option selected>Open this select menu</option>
                                              {
                                                village.map(village => (
                                                  <option key={village.id} value={village.id}>{village.name}</option>
                                                ))
                                              }
                                            </select>
                                        }
                                      </div>
                                    )
                                  }
                                  <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                      Zip Code
                                    </label>
                                    <input
                                      value={zipcode} onChange={(e) => setZipCode(e.target.value)}
                                      type="text"
                                      required
                                      autoComplete="given-name"
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                      Mobile Number
                                    </label>
                                    <input
                                      value={mobilenumber} onChange={(e) => setMobileNumber(e.target.value)}
                                      type="text"
                                      required
                                      autoComplete="given-name"
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                                :
                                ""
                              :
                              ""
                          }
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Create Kiosk
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
          </>
          :
          <>
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
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Kiosk Product</h1>
                    <p className="mt-4 text-base text-gray-500">
                      Immediately freeze the fresh seafoods you have!
                    </p>
                    <button
                      type="button"
                      className="mt-7 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-400 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                      Add Product
                    </button>
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
                          getKiosk.productSize.length === 0 ?
                            <span>Data not found</span>
                            :
                            getKiosk.productSize.map(product => (
                              <div
                                key={product.id}
                                className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
                              >
                                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                                  <img
                                    src={product.image[0].imgUrl}
                                    alt={product.productName}
                                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                                  />
                                </div>
                                <div className="flex-1 p-4 space-y-2 flex flex-col">
                                  <h3 className="text-sm font-medium text-gray-900">
                                    <a href={`/DetailProduct/${product.id}`}>
                                      <span aria-hidden="true" className="absolute inset-0" />
                                      {product.productName}
                                    </a>
                                  </h3>
                                  <p className="text-sm text-gray-500">{product.productDescription}</p>
                                  <div className="flex-1 flex flex-col justify-end">
                                    <p className="text-sm italic text-gray-500">{product.options}</p>
                                    <p className="text-base font-medium text-gray-900">{product.price.value}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                        }
                      </div>
                    </section>
                  </div>
                </main>
              </div>
            </div>
          </>
      }
    </>
  )
}

export default KioskScreen