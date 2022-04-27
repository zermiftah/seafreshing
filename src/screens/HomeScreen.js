import { React, Fragment } from "react";
import HeaderHS from "../components/HeaderHS";
import ShopSection from "./../components/homeComponents/ShopSection";
import ProductCategory from "../components/homeComponents/ProductCategory";
import Footer from "./../components/Footers";
import CarouselContainer from "../components/Carousel/CarouselContainer";
import NewArrival from "../components/homeComponents/NewArrival";

const HomeScreen = () => {
  window.scrollTo(0, 0);
  return (
    <Fragment>
      <div>
        <HeaderHS />
        <CarouselContainer />
        <ProductCategory />
        <ShopSection />
        <NewArrival />
        <Footer />
      </div>
    </Fragment>

  );
};

export default HomeScreen;
