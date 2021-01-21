import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

 function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, userInfo, error } = userLogin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
      };

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }

        return () => {
            //
        };

    }, [userInfo, props.history, redirect]);

    return (
    <div >
        <form className="form" onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Log In</h2>
                </li>
                <li>
                    { loading && <LoadingBox></LoadingBox> }
                    { error && <MessageBox variant="danger">{error}</MessageBox> }
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Log in</button>
                </li>
                <li>
                    <p className="text-center">New to Fine Desks? {' '}</p>
                </li>
                <li>
                    <Link to={`/register?redirect=${redirect}`} className="button secondary text-center">Create your account</Link>
                </li>
            </ul>
        </form>
    </div>
    )
}

export default Login;