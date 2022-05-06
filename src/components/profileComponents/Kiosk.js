import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Spinner from '../../screens/Spinner';

const Kiosk = () => {
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
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getKioskName();
    }, [kioskName])

    const getKioskName = async () => {
        try {
            let response = await axios.get(`http://103.102.152.201:3001/api/kiosk/check-name/${kioskName}`)
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
            let response = await axios.get(`http://103.102.152.201:3001/api/kiosk/check-domain/${kioskDomain}`)
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
            let response = await axios.get('http://103.102.152.201:3001/api/list/province')
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
            let response = await axios.get(`http://103.102.152.201:3001/api/list/regencies/${prov}`)
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
            let response = await axios.get(`http://103.102.152.201:3001/api/list/districts/${reg}`)
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
            let response = await axios.get(`http://103.102.152.201:3001/api/list/villages/${dist}`)
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
        setLoading(true);

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
            let response = await axios.post('http://103.102.152.201:3001/api/kiosk/open-kiosk', data, {
                headers: {
                    'auth-token': token,
                }
            })
            if (response.data) {
                setLoading(false);
                history.push('/kiosk');
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

    return (
        <>
            {
                loading ?
                    <Spinner />
                    :
                    <>
                        <form onSubmit={handleCreateKiosk} className="row  form-container">
                            <div className='col-md-6'>
                                <div className="form">
                                    <label>Kiosk Name</label>
                                    <input value={kioskName} onChange={(e) => setKioskName(e.target.value)} className="form-control" type="text" required />
                                    {
                                        getKName ?
                                            getKName.code === 10 ?
                                                <p className='text-danger'>{getKName.msg}</p>
                                                :
                                                <p className='text-success'>{getKName.msg}</p>
                                            : ""
                                    }
                                    <p>An attractive name will be remembered by buyers.</p>
                                    <p>The name cannot be the same as other kiosks.</p>
                                    <p>The selected kiosk name cannot be edited.</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="form">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <label>Kiosk Domain</label>
                                        <label>seafreshing.com/</label>
                                    </div>
                                    <input value={kioskDomain} onChange={(e) => setKioskDomain(e.target.value)} className="form-control" type="text" required />
                                    {
                                        getDName ?
                                            getDName.code === 10 ?
                                                <p className='text-danger'>{getDName.msg}</p>
                                                :
                                                <p className='text-success'>{getDName.msg}</p>
                                            : ""
                                    }
                                </div>
                            </div>
                            {
                                getKName && getDName ?
                                    getKName.code === 200 && getDName.code === 200 ?
                                        <>
                                            <div className='col-md-6'>
                                                <div className="form">
                                                    <label>Full Address</label>
                                                    <input value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" type="text" required />
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form">
                                                    <label>Provinsi</label>
                                                    {
                                                        province.length === 0 ?
                                                            <label>No data</label>
                                                            :
                                                            <select className='form-select' value={prov} onChange={(e) => setProv(e.target.value)} required>
                                                                <option selected>Open this select menu</option>
                                                                {
                                                                    province.map(province => (
                                                                        <option key={province.id} value={province.id}>{province.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                    }
                                                </div>
                                            </div>
                                            {
                                                prov && (
                                                    <div className='col-md-6'>
                                                        <div className="form">
                                                            <label>Kota</label>
                                                            {
                                                                regencies.length === 0 ?
                                                                    <label>No data</label>
                                                                    :
                                                                    <select className='form-select' value={reg} onChange={(e) => setReg(e.target.value)} required>
                                                                        <option selected>Open this select menu</option>
                                                                        {
                                                                            regencies.map(regencies => (
                                                                                <option key={regencies.id} value={regencies.id}>{regencies.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {
                                                reg && (
                                                    <div className='col-md-6'>
                                                        <div className="form">
                                                            <label>Kecamatan</label>
                                                            {
                                                                district.length === 0 ?
                                                                    <label>No data</label>
                                                                    :
                                                                    <select className='form-select' value={dist} onChange={(e) => setDist(e.target.value)} required>
                                                                        <option selected>Open this select menu</option>
                                                                        {
                                                                            district.map(district => (
                                                                                <option key={district.id} value={district.id}>{district.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {
                                                dist && (
                                                    <div className='col-md-6'>
                                                        <div className="form">
                                                            <label>Kelurahan</label>
                                                            {
                                                                village.length === 0 ?
                                                                    <label>No data</label>
                                                                    :
                                                                    <select className='form-select' value={vill} onChange={(e) => setVill(e.target.value)} required>
                                                                        <option selected>Open this select menu</option>
                                                                        {
                                                                            village.map(village => (
                                                                                <option key={village.id} value={village.id}>{village.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div className='col-md-6'>
                                                <div className="form">
                                                    <label>Zip Code</label>
                                                    <input value={zipcode} onChange={(e) => setZipCode(e.target.value)} className="form-control" type="text" required />
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form">
                                                    <label>Mobile Number</label>
                                                    <input value={mobilenumber} onChange={(e) => setMobileNumber(e.target.value)} className="form-control" type="text" required />
                                                </div>
                                            </div>
                                            <button type='submit'>Create Kiosk</button>
                                        </>
                                        :
                                        ""
                                    :
                                    ""
                            }
                        </form>
                    </>
            }
        </>
    )
}

export default Kiosk