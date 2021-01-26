import React, { useEffect } from 'react';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;

    const userTopSellersList = useSelector((state) => state.userTopSellersList);
    const {
        loading: loadingSellers,
        error: errorSellers,
        users: sellers,
    } = userTopSellersList;

    useEffect(() => {
        dispatch(listProducts());
        dispatch(listTopSellers());

        return () => {
            //
        }
    }, [dispatch]);

    return (
        <>
            <section id="products" className="products">
                <header className="hero">
                    <div className="banner">
                        <h1 className="banner-title">Fine Desks Collection</h1>
                        <a href="#products-center" className="banner-btn">shop now</a>
                    </div>
                </header>
                <div id="products-center" className="products-center">
                    <div>
                        <h2 className="text-center">Top Sellers</h2>
                        {loadingSellers ? (
                            <LoadingBox></LoadingBox>
                        ) : errorSellers ? (
                            <MessageBox variant="danger">{ errorSellers }</MessageBox>
                        ) : (
                            <>
                                {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
                                <Carousel showArrows autoPlay showThumbs={false}>
                                {sellers.map((seller) => (
                                    <div key={seller._id}>
                                    <Link to={`/seller/${seller._id}`}>
                                        <img src={seller.seller.logo} alt={seller.seller.name} />
                                        <p className="legend">{seller.seller.name}</p>
                                    </Link>
                                    </div>
                                ))}
                                </Carousel>
                            </>
                        )}
                    </div>
                    <div className="section-title">
                        <h2 className="text-center">Featured Products</h2>
                    </div>
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{ error }</MessageBox>
                    ) : (
                        <>
                            {products.length === 0 && <MessageBox>No Product Found.</MessageBox>}
                            <ul className="products-list">
                                <li>
                                    <div className="row center">
                                        {products.map((product) => (
                                        <Product key={product._id} product={product}></Product>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
            </section>
       </>
    );
}