import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footers from '../components/Footers';
import Header from '../components/Header';
import HeaderHS from '../components/HeaderHS';
import Rating from '../components/homeComponents/Rating';

const Search = ({ match }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const [search, setSearch] = useState([]);

    useEffect(() => {
        getSearch();
    }, [])

    const getSearch = async () => {
        try {
            let response = await axios.get(`http://103.102.152.201:3001/api/product/search-product?q=${match.params.id}`);
            setSearch(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    console.log(search)

    return (
        <>
            {
                token ?
                    <HeaderHS />
                    :
                    <Header />
            }
            {
                search.length === 0 ?
                    <div className='d-flex justify-content-center align-items-center h-100 w-100 py-5'>
                        Data tidak ditemukan
                    </div>
                    :
                    <div className="container">
                        <div className="section">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 article">
                                    <div className="shopcontainer row">
                                        {search.map((product) => (
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <Footers />
        </>
    )
}

export default Search