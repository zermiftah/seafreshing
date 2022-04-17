import React, { useEffect, useState, Component } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import axios from "axios";

const ShopSection = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchproducts = async () => {
      const data = await axios.get("api/product/get-all-product?page=1&limit=10")
      console.log(data)
      let temp = data.data.product.results
      setProducts(temp)
    }
    fetchproducts()
  }, []);

  return (
    <>
      <div classNameName="container">
        <div classNameName="section">
          <div classNameName="row">
            <div classNameName="col-lg-12 col-md-12 article">
              <div classNameName="shopcontainer row">
                {products.map((product) => (
                  < div
                    classNameName="shop col-lg-4 col-md-6 col-sm-6"
                    key={product.id}
                  >
                    <div classNameName="border-product">
                      <Link to={`/products/${product.id}`}>
                        <div classNameName="shopBack">
                          <img src={product.image[0].imgUrl} alt={product.productName} />
                        </div>
                      </Link>

                      <div classNameName="shoptext">
                        <p>
                          <Link to={`/products/${product.id}`}>
                            {product.productName}
                          </Link>
                        </p>

                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                        <h3>{product.price.value}</h3>
                      </div>
                    </div>
                  </div>
                ))}
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
