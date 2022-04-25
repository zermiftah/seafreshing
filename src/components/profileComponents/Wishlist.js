import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../homeComponents/Rating'
import "../../assets/css/wishlist.css"

const Wishlist = (props) => {
    return (
        <>
            {/* <div classNameName="container">
                <div classNameName="section">
                    <div classNameName="row">
                        <div classNameName="col-lg-12 col-md-12 article">
                            <div classNameName="shopcontainer row">
                                {props.getWishlist.map((product) => (
                                    < div
                                        classNameName="shop col-lg-4 col-md-6 col-sm-6"
                                        key={product.id}
                                    >
                                        <div classNameName="border-product">
                                            <Link to={`/products/${product.id}`}>
                                                <div classNameName="shopBack">
                                                    <img src={product.image} alt={product.productName} />
                                                </div>
                                            </Link>

                                            <div classNameName="shoptext">
                                                <p>
                                                    <Link to={`/products/${product.id}`}>
                                                        {product.name}
                                                    </Link>
                                                </p>

                                                <Rating
                                                    value={product.rating}
                                                    text={`${product.numReviews} reviews`}
                                                />
                                                <h3>{product.price}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <Fragment>
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-lg-8 pb-5">
                            {props.getWishlist.map((product) => (
                                <div className="cart-item d-md-flex justify-content-between"><span className="remove-item"><i className="fa fa-times"></i></span>
                                    <div className="px-3 my-3">
                                        <Link to={`/products/${product.id}`}>
                                            <a className="cart-item-product" href="#">
                                                <div className="cart-item-product-thumb"><img src={product.image} alt={product.productName} /></div>
                                                <div className="cart-item-product-info">
                                                    <h4 className="cart-item-product-title">{product.name}</h4>
                                                    <div className="text-lg text-body font-weight-medium pb-1">{product.price}</div>
                                                    <span>Availability: <span className="text-success font-weight-medium">In Stock</span></span>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        </>
    )
}

export default Wishlist