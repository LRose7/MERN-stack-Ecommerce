import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/userActions';

 function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, userInfo, error } = userLogin;
    const dispatch = useDispatch();

    useEffect(() => {
        if(userInfo) {

        }

        return () => {
            //
        };

    }, [userInfo, props.history]);

    const submit = (e) => {
        try {
            e.preventDefault();
            dispatch(login(email, password));
            props.history.push('/');

        } catch (error) {
            console.log(error.message);
            alert("Error logging in!");
            props.history.push('/login');
        }
    }

    return (
    <div className="form">
        <form onSubmit={submit}>
            <ul className="form-container">
                <li>
                    <h2>Log In</h2>
                </li>
                <li>
                    { loading && <div>Loading...</div> }
                    { error && <div>{ error }</div> }
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Log in</button>
                </li>
                <li>
                    <p className="text-center">New to Fine Desks?</p>
                </li>
                <li>
                    <Link to="/register" className="button secondary text-center">Create your Fine Desks account</Link>
                </li>
            </ul>

        </form>
    </div>
    )
}

export default Login;