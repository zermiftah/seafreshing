import React from "react";
import { Carousel } from "react-bootstrap";


import slide1 from "../../assets/img/slide1.png"
import slide2 from "../../assets/img/slide2.png"
import slide3 from "../../assets/img/slide3.png"
import slide4 from "../../assets/img/slide6.png"

const CarouselContainer = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={slide4} className="d-block img-fluid" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={slide4} className="d-block img-fluid" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={slide4} className="d-block img-fluid" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default CarouselContainer;