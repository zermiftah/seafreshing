import React from "react";
import { Carousel } from "react-bootstrap";


import slide1 from "../../assets/img/slide1.png"
import slide2 from "../../assets/img/slide2.png"
import slide3 from "../../assets/img/slide3.png"

const CarouselContainer = () => {
    const getBanner = async () => {
        try {

        } catch(e) {
            console.log(e.response.data.msg)
        }
    }

    return (
        <Carousel>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src={slide1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>What our clients say</h3>
                    <p>Our clients happily stay with our services for more several years now. See real reviews from our clients.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    className="d-block w-100"
                    src={slide2}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Our security</h3>
                    <p>Learn more about our security systems to make sure your data is always safe</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Our Team</h3>
                    <p>Our team consists of the best experts in the industry, learn about them</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselContainer;