import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import axios from "axios";

const ShopSection = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchproducts = async () => {
      const data = await axios.get("http://103.102.152.201:3001/api/product/get-all-product?page=1=&limit=10")
      let temp = data.data.product.results
      setProducts(temp)
    }
    fetchproducts()
  }, []);
  
  const Page = (items) => Math.ceil(items.length/10);

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {products.map((product) => (
                  < div
                    className="shop col-lg-4 col-md-6 col-sm-6"
                    key={product.id}
                  >
                    <div className="border-product">
                      <Link to={`/products/${product.id}`}>
                        <div className="shopBack">
                          <img src={product.image[0].imgUrl} alt={product.productName} />
                        </div>
                      </Link>

                      <div className="shoptext">
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
                {/* Pagination */}
                <Pagination page={Page(products)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
