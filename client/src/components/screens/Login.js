import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../actions/userActions';

 function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, userInfo, error } = userLogin;
    const dispatch = useDispatch();

    const history = useHistory();
    const registerRedirect = () => history.push("/");

    useEffect(() => {
        if(userInfo) {
            props.history.push("/");
        }

        return () => {
            //
        };

    }, [userInfo, props.history]);

    const submit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
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
                    New to Fine Desks?
                </li>
                <li>
                    <button onClick={registerRedirect} className="button secondary text-center">Create your Fine Desks account</button>
                </li>
            </ul>

        </form>
    </div>
    )
}

export default Login;