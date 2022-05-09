import { React, Fragment } from "react";
import HeaderHS from "../components/HeaderHS";
import ShopSection from "./../components/homeComponents/ShopSection";
import Footer from "./../components/Footers";
import Banner from "../components/Banner/Banner";
import Category from "../components/Catageory/Category";
import NewArrival from "../components/NewArrival/NewArrival";
import CTA from "../components/CTA/CTA";

const HomeScreen = () => {
  return (
    <Fragment>
      <HeaderHS />
      <Banner />
      <Category />
      <NewArrival />
      <CTA />
      <Footer />
    </Fragment>



  );
};

export default HomeScreen;

{/*  */ }

{/*  */ }