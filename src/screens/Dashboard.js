import ShopSection from "./../components/homeComponents/ShopSection";
import Footer from "./../components/Footers";
import CarouselContainer from "../components/Carousel/CarouselContainer";
import React, { Fragment } from "react";
import Header from "../components/Header";


const searchButton = ({
    '@media (min-width : 994px)': {
        form: {
            width: '650px'
        }
    }
})
const Dashboard = () => {

    return (
        <Fragment>
            <Header />
            <CarouselContainer />
            <ShopSection />
            <Footer />
        </Fragment >

    );
};

export default Dashboard;
