import React from 'react'

const Spinner = () => {
    return (
        <>
            <div className='vh-100 d-flex justify-content-center align-items-center flex-column gap-2'>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span>Creating Kiosk...</span>
            </div>
        </>
    )
}

export default Spinner