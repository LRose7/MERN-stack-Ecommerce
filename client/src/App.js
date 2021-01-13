import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './components/screens/HomeScreen';
import Register from './components/screens/Register';
import Login from './components/screens/Login';

import './style.css';

export default function App() {


  return (
    <>
    <BrowserRouter>
    <Header></Header>
    <Switch>
      <Route path="/" exact={true} component={HomeScreen}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/login" component={Login}></Route>
    </Switch>
    <Footer></Footer>
    </BrowserRouter>
    </>
  );
}