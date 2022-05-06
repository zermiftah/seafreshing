import ShopSection from "./../components/homeComponents/ShopSection";
import Footer from "./../components/Footers";
import Banner from "../components/Banner/Banner";
import React, { Fragment } from "react";
import Header from "../components/Header";
import Category from "../components/Catageory/Category";

const Dashboard = () => {

    return (
        <Fragment>
            <Header />
            <Banner />
            <Category />
            <Footer />
        </Fragment >

    );
};

export default Dashboard;
