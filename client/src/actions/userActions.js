import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL
} from '../constants/userConstants';

import Axios from 'axios';
import Cookie from 'js-cookie';

const register = (name, email, password, passwordCheck) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password, passwordCheck } });
    try {
        const { data } = await Axios.post("http://localhost:5000/user/register", { name, email, password, passwordCheck });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}

const login = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("http://localhost:5000/user/login", { email, password });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
    }
}

export { register, login };