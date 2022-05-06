import Footer from "./../components/Footers";
import Banner from "../components/Banner/Banner";
import React, { Fragment } from "react";
import Header from "../components/Header";
import Category from "../components/Catageory/Category";
import NewArrival from "../components/NewArrival/NewArrival";
import CTA from "../components/CTA/CTA";

const Dashboard = () => {

    return (
        <Fragment>
            <Header />
            <Banner />
            <Category />
            <NewArrival />
            <CTA />
            <Footer />
        </Fragment >

    );
};

export default Dashboard;
