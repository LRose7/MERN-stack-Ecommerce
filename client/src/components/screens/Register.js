import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { register } from '../../actions/userActions';

function Register(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();

    const history = useHistory();
    const loginRedirect = () => history.push("/login");

    useEffect(() => {
        if(userInfo) {
            props.history.push('/login');
        }

        return () => {
            //
        };

    }, [userInfo, props.history]);

    const submit = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password, passwordCheck));
    }

    return (
        <div className="form">
            <form onSubmit={submit}>
            <ul className="form-container">
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    { loading && <div>Loading...</div> }
                    { error && <div>{ error }</div> }
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
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

                    <input type="password" name="passwordCheck" id="passwordCheck" placeholder="Verify Password" onChange={(e) => setPasswordCheck(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li> <p className="text-center">Already have an account?</p></li>
                <li>
                <button onClick={loginRedirect} className="button secondary text-center">Login</button>
                </li>
            </ul>
        </form>
    </div>
    )
}

export default Register;