


const NewArrival = () => {
    return (
        <div className="best_sellers">
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <div className="section_title new_arrivals_title">
                            <h2>Best Sellers</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="product_slider_container">
                            <div className="owl-carousel owl-theme product_slider">

                                <div className="owl-item product_slider_item">
                                    <div className="product-item">
                                        <div className="product discount">
                                            <div className="product_image">
                                                <img src={fish} alt="" />
                                            </div>
                                            <div className="favorite favorite_left"></div>
                                            <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                                            <div className="product_info">
                                                <h6 className="product_name"><a href="single.html">Fujifilm X100T 16 MP Digital Camera (Silver)</a></h6>
                                                <div className="product_price">$520.00<span>$590.00</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="owl-item product_slider_item">
                                    <div class="product-item accessories">
                                        <div class="product">
                                            <div class="product_image">
                                                <img src="images/product_8.png" alt="" />
                                            </div>
                                            <div class="favorite"></div>
                                            <div class="product_info">
                                                <h6 class="product_name"><a href="single.html">Blue Yeti USB Microphone Blackout Edition</a></h6>
                                                <div class="product_price">$120.00</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="product_slider_nav_left product_slider_nav d-flex align-items-center justify-content-center flex-column">
                                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                </div>
                                <div className="product_slider_nav_right product_slider_nav d-flex align-items-center justify-content-center flex-column">
                                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewArrival;