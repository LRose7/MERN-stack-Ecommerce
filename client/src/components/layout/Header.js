import React from 'react';
import { Link } from 'react-router-dom';


export default function Header() {
    const openMenu = () => {
        document.querySelector('.sidebar').classList.add('open');
      }
      const closeMenu = () => {
        document.querySelector('.sidebar').classList.remove('open');
      }
    return (
        <div className="grid-container">
        <nav className="navbar">
            <div className="navbar-center">
                <div className="brand">
                    <button onClick={openMenu}>&#9776;</button>
                </div>
                <div className="logo-title">
                    <h1><img className="logo-img" src="./images/JALogo2.PNG" alt="logo" />
                      <Link
                      to='/'
                      activeStyle={{color: 'teal'}}> Fine Desks</Link></h1>
                </div>
                <div className="nav-links">
                    <Link to ="/register" className="nav-link">Register</Link>
                    <Link to="/login" className="nav-link">Log in</Link>
                    <div className="cart-btn">
                        <span className="nav-icon">
                             <Link
                             to="/cart/:id?">
                                 <i className="fas fa-shopping-cart"></i>
                             </Link>
                         </span>
                        <div className="cart-items">0</div>
                    </div>
                </div>
            </div>
        </nav>
        <aside className="sidebar">
            <button className="sidebar-close-button" onClick={closeMenu}>
              x
            </button>
            <div className="sidebar-title">
                <h3>Shopping Categories</h3>
            </div>
            <ul className="sidebar-list">
                <li><a href="index.html">Corner Desks</a></li>

                <li><a href="index.html">Student Desks</a></li>

                <li><a href="index.html"> Writing Desks</a></li>

                <li><a href="index.html">Executive Desks</a></li>

                <li><a href="index.html">Credenza Desks</a></li>

                <li><a href="index.html">Floating Desks</a></li>

                <li><a href="index.html">Standing Desks</a></li>
            </ul>
        </aside>
    </div>
    )
}