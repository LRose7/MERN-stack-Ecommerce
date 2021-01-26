import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // sends ajax requests in redux actions
// import Cookie from 'js-cookie';
import {
    userRegisterReducer,
    userLoginReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
    userDeleteReducer,
    userListReducer,
    userTopSellerListReducer,
    userAddressMapReducer,
} from './reducers/userReducers';
import {
    productCategoryListReducer,
    productCreateReducer,
    productListReducer,
    productDetailsReducer,
    productSaveReducer,
    productDeleteReducer,
    productReviewCreateReducer,
    productUpdateReducer,
} from './reducers/productReducers';
import {
    cartReducer
} from './reducers/cartReducers';
import {
    orderCreateReducer,
    orderDeleteReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderMineListReducer,
    orderPayReducer,
  } from './reducers/orderReducers';


// const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
    // userRegister: { userInfo },
    userLogin: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal',
    },
};
const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userTopSellersList: userTopSellerListReducer,
    userAddressMap: userAddressMapReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productList: productListReducer,
    productCategoryList: productCategoryListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productReviewCreate: productReviewCreateReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;