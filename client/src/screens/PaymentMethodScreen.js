import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <ul className="form-container">
                    <li className="text-center"><h2>Payment Method</h2></li>
                    <li>
                        <input
                        type="radio"
                        id="paypal"
                        value="PayPal"
                        name="paymentMethod"
                        required
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="paypal">PayPal</label>
                    </li>
                    <li>
                        <input
                        type="radio"
                        id="stripe"
                        value="Stripe"
                        name="paymentMethod"
                        required
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="stripe">Stripe</label>
                    </li>
                    <li>
                        <button className="primary" type="submit">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
    )
}
