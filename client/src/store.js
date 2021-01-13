import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userRegisterReducer, userLoginReducer } from './reducers/userReducers';
import { productListReducer, productSaveReducer } from './reducers/productReducers';

const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { userRegister: { userInfo }, userLogin: { userInfo } };
const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    productList: productListReducer,
    productSave: productSaveReducer,
})

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export default store;