import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Notif from '../components/simple';

const KioskScreen = () => {
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

    try {
      let response = await axios.post('https://server.seafreshing.com/api/kiosk/open-kiosk', data, {
        headers: {
          'auth-token': token,
        }
      })
    } catch (e) {
      if (e) {
        console.log(e)
        console.log(e.response.data)
      } else if (e.response.data) {
        console.log(e.response.data)
      }
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
              <Notif title='Error' text={getKName.msg} />
              :
              <Notif title='Success' text={getKName.msg} />
            : ""
      }
      {
        !kioskDomain ?
          ""
          :
          getDName ?
            getDName.code === 10 ?
              <Notif title='Error' text={getDName.msg} />
              :
              <Notif title='Success' text={getDName.msg} />
            : ""
      }
      {
        notif.success && (
          <Notif title={notif.success} text="Data has been saved!" />
        )
      }
      {
        notif.error && (
          <Notif title='Error' text={notif.error} />
        )
      }
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
                            <button type='submit'>Create Kiosk</button>
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
                    Save
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
  )
}

export default KioskScreen