import { React, Fragment } from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footers";
import CarouselContainer from "../components/Carousel/CarouselContainer";

const HomeScreen = () => {
  window.scrollTo(0, 0);
  return (
    <Fragment>
      <div>
        <Header />
        <CarouselContainer />
        <ShopSection />
        <CalltoActionSection />
        <ContactInfo />
        <Footer />
      </div>
    </Fragment>

  );
};

export default HomeScreen;
