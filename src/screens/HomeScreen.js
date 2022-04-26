import { React, Fragment } from "react";
import HeaderHS from "../components/HeaderHS";
import ShopSection from "./../components/homeComponents/ShopSection";
import ProductCategory from "../components/homeComponents/ProductCategory";
import Footer from "./../components/Footers";
import CarouselContainer from "../components/Carousel/CarouselContainer";

const HomeScreen = () => {
  window.scrollTo(0, 0);
  return (
    <Fragment>
      <div>
        <HeaderHS />
        <CarouselContainer />
        <ProductCategory />
        <ShopSection />
        <Footer />
      </div>
    </Fragment>

  );
};

export default HomeScreen;
