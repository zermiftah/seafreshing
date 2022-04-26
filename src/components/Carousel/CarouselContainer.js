import React from "react";
import slide1 from "../../assets/img/slide6.png";
import slide2 from "../../assets/img/slide7.png";

import "../../assets/css/Carousel.css"

const CarouselContainer = () => {

    return (
        <div className="container">
            <div id="mycarousel" className="carousel slide" data-ride="carousel" data-interval="2000">
                <ol className="carousel-indicators">
                    <li data-target="#mycarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#mycarousel" data-slide-to="1"></li>
                    <li data-target="#mycarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active"> <img src={slide1} className="d-block w-100" alt="..." /> </div>
                    <div className="carousel-item"> <img src={slide2} className="d-block w-100" alt="..." /> </div>
                </div> <a className="carousel-control-prev" href="#mycarousel" role="button" data-slide="prev">
                    <div className="banner-icons"> <span className="fas fa-angle-left"></span> </div> <span className="sr-only">Previous</span>
                </a> <a className="carousel-control-next" href="#mycarousel" role="button" data-slide="next">
                    <div className="banner-icons"> <span className="fas fa-angle-right"></span> </div> <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
};

export default CarouselContainer;