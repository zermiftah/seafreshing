import axios from "axios";
import React from "react";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Orders from "./../components/profileComponents/Orders";

const OtpVerifyScreen = () => {
    const handleVerify = async (e) => {
        e.preventDefault()
        const qs = require('qs')
        let data = localStorage.getItem("user-data")
        console.log(data, "Data");
        // try {
        //     let response = await axios.post(
        //         'http://103.102.152.201:3001/api/user/verify-email-code',
        //         qs.stringify({
        //             "id": id,
        //             "code": code,
        //             "requestId": requestId,
        //             "email": email
        //         })
        //     )
        //     if (response.data) {
        //         history.push('/login')
        //     } else {
        //         history.push('/')
        //     }
        // } catch (error) {
        //     return error.message
        // }
    }
    window.scrollTo(0, 0);
    return (
        <>
        <div className="container mt-lg-5 mt-3">
            <div className="row align-items-center">
            <div className="col col-lg-3 p-0 shadow "></div>
            <div className="col col-lg-6 p-0 shadow ">
                <div className="author-card pb-0 pb-md-3">
                <div className="author-card-cover"></div>
                <div className="author-card-profile row">
                    <div className="author-card-details col-md-7">
                    <h3 className="author-card-name mb-2">
                        <strong>OTP Verification</strong>
                    </h3>
                    <span className="author-card-position">
                        <>Please Enter OTP sent to Your Email </>
                    </span>
                    </div>
                    <div className="author-card-details col-md-7">
                    <span className="author-card-position">
                    <input
                            name='code'
                            placeholder='OTP Code'
                        />
                    </span>
                    </div>
                </div>
                <div className="wizard pt-3 ">
                <div class="d-flex align-items-start">
                    <div
                    class="nav align-items-start flex-column col-12 nav-pills me-3 "
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                    >
                    <button
                        class="nav-link active"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                    >
                        Verify
                    </button>
                    </div>
                </div>
                </div>
                </div>
            </div>
            <div className="col col-lg-3 p-0 shadow ">
                
            </div>
            </div>    
        </div>
        </>
    );
};

export default OtpVerifyScreen;
