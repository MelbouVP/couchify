import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../Searchbar/searchbar.component';

import './navbar.styles.scss';

const Navbar = () => {
    console.log('navbar')
    return (
        <header className="header">
            <nav className="navbar">
                <div className="navbar__content">
                    <ul className="navbar__nav">
                        <li>
                            <Link to='/' > Home </Link>
                        </li>
                        <li>
                            <Link to='/filter' > Filter </Link> 
                        </li>
                    </ul>
                </div>
                <div className="navbar__content">
                    <SearchBar />
                </div>
                <div className="navbar__content">
                <ul className="navbar__nav">
                    <li>Register</li>
                    <li>Login</li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}


export default Navbar;