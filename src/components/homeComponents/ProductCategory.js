import React from "react";
import fish from "../../assets/img/fish2.jpg"
import shrimp from "../../assets/img/shrimp.jpg"
import mussels from "../../assets/img/mussels.jpg"
import items from "../../assets/img/items.jpg"
import fishIcon from "../../assets/img/fishIcon.jpg"
import "../../assets/css/ProductCategory.css"

const ProductCategory = () => {
    return (
        <div className="container">
            <div className="section">
                <div className="row">
                    <h3 className="p-3 ">Category</h3>
                    <div className=" mx-auto col-md-3 col-sm-6">
                        <div className="product-grid">
                            <div className="product-image">
                                <a href="#" className="image">
                                    <img className="pic-1" src={fish} />
                                </a>
                                <ul className="product-links">
                                    <li><a href="#" data-tip="Add to Wishlist"><i className="fas fa-heart"></i></a></li>
                                    <li><a href="#" data-tip="Compare"><i className="fa fa-random"></i></a></li>
                                    <li><a href="#" data-tip="Quick View"><i className="fa fa-search"></i></a></li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="title p-2">Fish</h3>
                                <a className="add-to-cart" href="#">See All</a>
                            </div>
                        </div>
                    </div>
                    <div className=" mx-auto col-md-3 col-sm-6">
                        <div className="product-grid">
                            <div className="product-image">
                                <a href="#" className="image">
                                    <img className="pic-1" src={shrimp} />
                                </a>
                                <ul className="product-links">
                                    <li><a href="#" data-tip="Add to Wishlist"><i className="fas fa-heart"></i></a></li>
                                    <li><a href="#" data-tip="Compare"><i className="fa fa-random"></i></a></li>
                                    <li><a href="#" data-tip="Quick View"><i className="fa fa-search"></i></a></li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="title p-2">Shrimp</h3>
                                <a className="add-to-cart" href="#">See All</a>
                            </div>
                        </div>
                    </div>
                    <div className=" mx-auto col-md-3 col-sm-6">
                        <div className="product-grid">
                            <div className="product-image">
                                <a href="#" className="image">
                                    <img className="pic-1" src={mussels} />
                                </a>
                                <ul className="product-links">
                                    <li><a href="#" data-tip="Add to Wishlist"><i className="fas fa-heart"></i></a></li>
                                    <li><a href="#" data-tip="Compare"><i className="fa fa-random"></i></a></li>
                                    <li><a href="#" data-tip="Quick View"><i className="fa fa-search"></i></a></li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="title p-2">Mussels</h3>
                                <a className="add-to-cart" href="#">See All</a>
                            </div>
                        </div>
                    </div>
                    <div className=" mx-auto col-md-3 col-sm-6">
                        <div className="product-grid">
                            <div className="product-image">
                                <a href="#" className="image">
                                    <img className="pic-1" src={items} />
                                </a>
                                <ul className="product-links">
                                    <li><a href="#" data-tip="Add to Wishlist"><i className="fas fa-heart"></i></a></li>
                                    <li><a href="#" data-tip="Compare"><i className="fa fa-random"></i></a></li>
                                    <li><a href="#" data-tip="Quick View"><i className="fa fa-search"></i></a></li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="title p-2">Items</h3>
                                <a className="add-to-cart" href="#">See All</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductCategory;
