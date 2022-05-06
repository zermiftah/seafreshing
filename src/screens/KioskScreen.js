import React from 'react'
import Header from '../components/Header'
import AddProduct from '../components/KioskComponents/AddProduct'
import Sales from '../components/KioskComponents/Sales'
import Setting from '../components/KioskComponents/Setting'
import TotalProduct from '../components/KioskComponents/TotalProduct'

const KioskScreen = () => {
  return (
    <>
    <Header />
    <div className="container mt-lg-5 mt-3 mb-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img src="" alt="kioskprofileimage" />
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>ABC</strong>
                  </h5>
                  <span className="author-card-position">
                    <>Joined Dec 12 2021</>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div className="d-flex align-items-start">
                <div
                  className="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="true"
                  >
                    Kiosk Settings
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-add-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-add"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-add"
                    aria-selected="false"
                  >
                    Add Product
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-total-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-total"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-total"
                    aria-selected="false"
                  >
                    Your Total Products
                  </button>
                  <button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-sales-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-sales"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-sales"
                    aria-selected="false"
                  >
                    View Kiosk Sales
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div
            className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="v-pills-settings"
              role="tabpanel"
              aria-labelledby="v-pills-settings-tab"
            >
              <Setting />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-add"
              role="tabpanel"
              aria-labelledby="v-pills-add-tab"
            >
              <AddProduct />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-total"
              role="tabpanel"
              aria-labelledby="v-pills-total-tab"
            >
              <TotalProduct />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-sales"
              role="tabpanel"
              aria-labelledby="v-pills-sales-tab"
            >
              <Sales />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default KioskScreen