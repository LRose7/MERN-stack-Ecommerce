import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



function Register(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, userInfo, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert('Password and confirm password do not match');
        } else {
          dispatch(register(name, email, password));
        }
      };

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };

    }, [props.history, userInfo, redirect]);

    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2 className="text-center">Create Account</h2>
                </li>
                <li>
                    { loading && <LoadingBox></LoadingBox> }
                    { error && <MessageBox variant="danger">{error}</MessageBox> }
                </li>
                <li>
                    <label htmlFor="name">Name</label>
                    <input
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Enter Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    ></input>
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
                    placeholder="Enter password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </li>
                <li>
                    <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li> <p className="text-center">Already have an account?{' '}</p></li>
                <li>
                    <Link to={`/login?redirect=${redirect}`} className="button secondary text-center">Log in</Link>
                </li>
            </ul>
        </form>
    </div>
    )
}

export default Register;