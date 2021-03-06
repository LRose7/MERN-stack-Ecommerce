import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';


export default function ProductScreen(props) {

    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        };
    }, [dispatch, props.match.params.id]);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return  <div>
        {loading? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{ error }</MessageBox>
        ) : (
            <>
            <div className="back-to-results">
                <Link to="/">Back to results</Link>
            </div>
            <div className="details" key={product._id}>
            <div className="details-image">
                <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
                <ul>
                    <li key={product._id}>
                        <h4>{product.name}</h4>
                    </li>
                    <li>{product.rating} Stars ({product.numReviews})</li>
                    <li>Price: <b>${product.price}</b></li>
                    <li>
                        Description:
                        <div>{product.description}</div>
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: ${product.price}
                    </li>
                    <li>
                        Status: {product.countInStock > 0? "In Stock" : "Unavailable."}
                    </li>
                    <li>
                        Qty:
                        <select
                        value={qty}
                        onChange = {(e) => {
                            setQty(e.target.value);
                        }}
                        >
                           {[...Array(product.countInStock).keys()].map((x) => (
                               <option key={x + 1} value={x + 1}>
                                   {x + 1}
                               </option>
                           ))}
                        </select>
                    </li>
                    <li>
                        { product.countInStock > 0 && (
                        <button
                        onClick={handleAddToCart}
                        className="button primary"
                        >
                            Add to cart
                        </button>
                        )}

                    </li>
                </ul>
            </div>
        </div>
        </>
        )}
    </div>
}