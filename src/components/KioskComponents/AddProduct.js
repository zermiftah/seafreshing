import React, { useState } from 'react'

const AddProduct = () => {
    const [kioskName, setKioskName] = useState('');
    const [kioskDomain, setKioskDomain] = useState('');

    return (
        <>
            <form className="row  form-container">
                <div className='col-md-6'>
                    <div className="form">
                        <label>Product Name</label>
                        <input value={kioskName} onChange={(e) => setKioskName(e.target.value)} className="form-control" type="text" required />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="form">
                        <label>Image</label>
                        <input className="form-control" type="file" required />
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className="form">
                        <label>Category</label>
                        <div
                            className="btn-group d-block"
                            role="group"
                            aria-label="Basic radio toggle button group"
                        >
                            <input
                                type="radio"
                                className="btn-check"
                                name="btnradio"
                                id="btnradio1"
                                autoComplete="off"
                                defaultChecked=""
                            />
                            <label className="btn btn-outline-primary px-3" htmlFor="btnradio1">
                                Fish
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="btnradio"
                                id="btnradio2"
                                autoComplete="off"
                            />
                            <label className="btn btn-outline-primary px-3" htmlFor="btnradio2">
                                Shrimp
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="btnradio"
                                id="btnradio3"
                                autoComplete="off"
                            />
                            <label className="btn btn-outline-primary px-3" htmlFor="btnradio3">
                                Mussels
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="btnradio"
                                id="btnradio4"
                                autoComplete="off"
                            />
                            <label className="btn btn-outline-primary px-3" htmlFor="btnradio4">
                                Support Items
                            </label>
                        </div>


                    </div>
                </div>
                <div className='col-md-12'>
                    <div className="form">
                        <label>Product Price</label>
                        <div className='d-flex justify-content-between align-items-center gap-2'>
                            <input value={kioskName} onChange={(e) => setKioskDomain(e.target.value)} className="form-control" type="text" required />
                            <select className='form-select'>
                                <option>/Kg</option>
                                <option>/Kwintal</option>
                                <option>/Ton</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className="d-flex justify-content-start align-items-center gap-2">
                        <span>Wholesale</span>
                        <button>Toggle Button</button>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className="form">
                        <label>Stock</label>
                        <div className='d-flex justify-content-between align-items-center gap-2'>
                            <input value={kioskName} onChange={(e) => setKioskDomain(e.target.value)} className="form-control" type="text" required />
                            <select className='form-select'>
                                <option>Kg</option>
                                <option>Kwintal</option>
                                <option>Ton</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className="form">
                        <label>Min. Order</label>
                        <div className='d-flex justify-content-between align-items-center gap-2'>
                            <input value={kioskName} onChange={(e) => setKioskDomain(e.target.value)} className="form-control" type="text" required />
                            <select className='form-select'>
                                <option>Kg</option>
                                <option>Kwintal</option>
                                <option>Ton</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className="d-flex justify-content-start align-items-center gap-2">
                        <span>Pre Order</span>
                        <button>Toggle Button</button>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className="d-flex justify-content-start align-items-center gap-2">
                        <span>Kiosk Self</span>
                        <button>Toggle Button</button>
                    </div>
                </div>
                <button type='submit'>Save</button>
            </form>
        </>
    )
}

export default AddProduct