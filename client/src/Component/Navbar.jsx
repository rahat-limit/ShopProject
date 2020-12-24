import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Request/User';

function Navbar() {
    const isAuth = useSelector(state => state.user.isAuth)

    const dispatch = useDispatch()
    return (
        <nav>
            <div className="nav-wrapper main_navbar">
                <a href="/" className="brand-logo">Shop</a> 
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {!isAuth && <li><a href="/login">Sign In</a></li>}
                    {!isAuth && <li><a href="/register">Sign Up</a></li>}
                    {isAuth && <li><a href="/" onClick={() => dispatch(logout())}>LogOut</a></li>}
                </ul>
            </div>
      </nav>
    )
}

export default Navbar
