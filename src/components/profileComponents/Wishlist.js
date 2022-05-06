import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../homeComponents/Rating'

const Wishlist = (props) => {
    return (
        <>
            {
                props.getWishlist.length === 0 ?
                    <div className="col-12 alert alert-info text-center mt-3">
                        No Wishlists
                    </div>
                    :
                    <div className="container">
                        <div className="section">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 article">
                                    <div className="shopcontainer row">
                                        {props.getWishlist.map((product) => (
                                            < div
                                                className="shop col-lg-4 col-md-6 col-sm-6"
                                                key={product.id}
                                            >
                                                <div className="border-product">
                                                    <Link to={`/products/${product.id}`}>
                                                        <div className="shopBack">
                                                            <img src={product.image} alt={product.productName} />
                                                        </div>
                                                    </Link>

                                                    <div className="shoptext">
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
                    </div>
            }
        </>
    )
}

export default Wishlist