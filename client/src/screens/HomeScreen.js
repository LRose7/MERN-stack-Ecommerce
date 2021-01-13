import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        loading? <div>Loading...</div> :
        error? <div>{error}</div>:
        <section id="products" className="products">
            <header className="hero">
                <div className="banner">
                    <h1 className="banner-title">Fine Desks Collection</h1>
                    <a href="#products-center" className="banner-btn">shop now</a>
                </div>
            </header>
        <div id="products-center" className="products-center">
            <div className="section-title">
                <h2>Our Products</h2>
            </div>
            <ul className="products-list">
            {
                products.map(product =>
                <li className="product" key={product._id}>
                <div className="image-container">
                <Link to={"/product/" + product._id}> <img
                    src={product.image}
                    alt="product1"
                    className="product-image"
                    />
                </Link>

                </div>
                <div className="product-name">
                    <Link to={"/product/" + product._id}> {product.name}</Link>
                </div>
                <div className="product-description"><p>{product.description}</p> </div>
                <div className="product-type">{product.type}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">{product.rating} Stars ({product.numReviews})</div>
            </li>
                )
            }
        </ul>
        </div>
    </section>
    )
}