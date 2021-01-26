import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { logout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from "./screens/CartScreen";
import ProfileScreen from './screens/ProfileScreen';
import ProductScreen from './screens/ProductScreen';
import ProductListScreen from './screens/ProductListScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import ProductsScreen from './screens/ProductsScreen';
import EditProductsScreen from './screens/EditProductsScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import Footer from './layout/Footer';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
// import MapScreen from './screens/MapScreen';
import { listProductCategories } from './actions/productActions';

// import './style.css';


export default function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);


  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              &#9776;
            </button>
            <Link className="brand" to="/">
            <img className="logo-img" src="./images/JALogo2.PNG" alt="logo" />
              Fine Desks
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div className="cart-btn">
            <span className="nav-icon">
              <Link to="/cart">
                <i className="fas fa-shopping-cart"></i>
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
            </span>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#logout" onClick={logoutHandler}>
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">Log In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
    </header>
    <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
    <main>
      <Route path="/" exact={true} component={HomeScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/login" component={LoginScreen}></Route>
      <Route path="/product/:id" component={ProductScreen}></Route>
      <Route path="/products" component={ProductsScreen}></Route>
      <Route 
      path="/product/:id/edit" 
      component={EditProductsScreen}
      exact
      ></Route>
      <Route path="/cart/:id?" component={CartScreen}></Route>
      <Route path="/seller/:id" component={SellerScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      <Route path="/orderlist" component={OrderListScreen}></Route>
      <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
      ></Route>
      <Route
          path="/search/category/:category"
          component={SearchScreen}
          exact
      ></Route>
        <Route
          path="/search/category/:category/name/:name"
          component={SearchScreen}
          exact
      ></Route>
      <Route
        path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
        component={SearchScreen}
        exact
      ></Route>
      <PrivateRoute
            path="/profile"
            component={ProfileScreen}
      ></PrivateRoute>
      {/* <PrivateRoute path="/map" component={MapScreen}></PrivateRoute> */}
      <AdminRoute
          path="/productlist"
          component={ProductListScreen}
          exact
      ></AdminRoute>
      <AdminRoute
        path="/productlist/pageNumber/:pageNumber"
        component={ProductListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/orderlist"
        component={OrderListScreen}
        exact
      ></AdminRoute>
      <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
      <AdminRoute
        path="/user/:id/edit"
        component={UserEditScreen}
      ></AdminRoute>
      <SellerRoute
        path="/productlist/seller"
        component={ProductListScreen}
      ></SellerRoute>
      <SellerRoute
        path="/orderlist/seller"
        component={OrderListScreen}
      ></SellerRoute>

    </main>
    <Footer></Footer>
    </div>
    </BrowserRouter>
  );
}