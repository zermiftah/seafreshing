import "../assets/css/ProductList.css"

const ProductList = () => {
    return (
        <div className="container_1 mt-3 mx-auto">
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="image-container">
                            <div className="first">
                                <div className="d-flex justify-content-between align-items-center"> <span className="discount">-25%</span> <span className="wishlist"><i className="fa fa-heart-o"></i></span> </div>
                            </div> <img src="https://i.imgur.com/8JIWpnw.jpg" className="img-fluid rounded thumbnail-image" />
                        </div>
                        <div className="product-detail-container p-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="dress-name">White traditional long dress</h5>
                                <div className="d-flex flex-column mb-2"> <span className="new-price">$3.99</span> </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center pt-1">
                            </div>
                            <div className="d-flex justify-content-between align-items-center pt-1">
                                <div> </div> <button type="button" className="btn btn-info btn-rounded">BUY </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                    </div>
                </div>




            </div>
        </div>
    );
}

export default ProductList;
