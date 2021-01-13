import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';


import './style.css';

export default function App() {


  return (
    <>
    <BrowserRouter>
    <Header></Header>
      <Route path="/" exact={true} component={HomeScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/login" component={LoginScreen}></Route>
    <Footer></Footer>
    </BrowserRouter>
    </>
  );
}