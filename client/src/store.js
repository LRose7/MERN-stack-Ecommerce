import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userRegisterReducer, userLoginReducer } from './reducers/userReducers';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { userRegister: { userInfo }, userLogin: { userInfo }, cart: { cartItems } };
const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
})

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export default store;