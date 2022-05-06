import { React, Fragment } from "react";
import HeaderHS from "../components/HeaderHS";
import ShopSection from "./../components/homeComponents/ShopSection";
import Footer from "./../components/Footers";
import Banner from "../components/Banner/Banner";

const HomeScreen = () => {
  return (
    <Fragment>
      <HeaderHS />
      <Banner />
      <ShopSection />
      <Footer />
    </Fragment>

  );
};

export default HomeScreen;
