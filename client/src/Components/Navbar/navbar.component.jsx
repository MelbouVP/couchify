import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { toast } from 'react-toastify'

import { logOutUser } from '../../Redux/user-data/user.actions'
import { selectUserIsAuthenticated } from '../../Redux/user-data/user.selectors';

import SearchBar from '../Searchbar/searchbar.component';

import './navbar.styles.scss';

const Navbar = ({ isAuthenticated, logOutUser }) => {
    console.log('navbar')


    const handleClick = () => {
        window.scrollTo(0,0)
    }

    const handleLogOut = () => {
        window.scrollTo(0,0)
        logOutUser()

        toast.info('✔️ You have been logged out.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <header className="header">
            <nav className="navbar">
                <div className="navbar__content">
                    <ul className="navbar__nav">
                        <li>
                            <Link to='/' onClick={handleClick} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#A2AEBB" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <title>Home</title>
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                            </svg>
                            </Link>
                        </li>
                        <li>
                            <Link to='/filter' onClick={handleClick} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments-horizontal" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#A2AEBB" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <title>Filter</title>
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <circle cx="14" cy="6" r="2" />
                                    <line x1="4" y1="6" x2="12" y2="6" />
                                    <line x1="16" y1="6" x2="20" y2="6" />
                                    <circle cx="8" cy="12" r="2" />
                                    <line x1="4" y1="12" x2="6" y2="12" />
                                    <line x1="10" y1="12" x2="20" y2="12" />
                                    <circle cx="17" cy="18" r="2" />
                                    <line x1="4" y1="18" x2="15" y2="18" />
                                    <line x1="19" y1="18" x2="20" y2="18" />
                                </svg>    
                            </Link> 
                        </li>
                    </ul>
                </div>
                <div className="navbar__content">
                    <SearchBar />
                </div>
                <div className="navbar__content">
                    { isAuthenticated ? 
                            <ul className="navbar__nav">
                                <li>
                                    <Link to='/profile' onClick={handleClick} className="navbar__nav--link">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/' onClick={handleLogOut} className="navbar__nav--link">
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        :
                            <ul className="navbar__nav">
                                <li>
                                    <Link to='/register' onClick={handleClick} className="navbar__nav--link">
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/login' onClick={handleClick} className="navbar__nav--link" >
                                        Login
                                    </Link>
                                </li>
                            </ul>
                    }
                </div>
            </nav>
        </header>
    )
}

const mapDispatchToProps = dispatch => ({
    logOutUser: () => dispatch(logOutUser())
})

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectUserIsAuthenticated
})


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Navbar));