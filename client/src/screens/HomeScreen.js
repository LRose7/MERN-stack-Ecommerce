import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());

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
                    <div className="section-title">
                        <h2 className="text-center">Featured Products</h2>
                    </div>
                    {loading? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{ error }</MessageBox>
                    ) : (
                        <>
                        { products.length === 0 && <MessageBox>No Product Found.</MessageBox>}
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