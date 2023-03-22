import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/Logo.png'

function NavBar() {

    return (

        <>
            {/* Header section */}
            <header className="header-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <Link to='/home' className='link-logo'>
                                <div className="site-logo">
                                    <img src={logo} alt="" />
                                    <h1>CourseCuer</h1>
                                </div>
                            </Link>
                            <div className="nav-switch">
                                <i className="fa fa-bars" />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9">
                            <Link to='/login' className='link-logo'>
                                <h6  className="site-btn header-btn">
                                    Login
                                </h6>
                            </Link>

                            <nav className="main-menu">
                                <ul>

                                    <li>
                                        <Link to='/favourites' className='main-menu-item'>Favourites</Link>
                                    </li>
                                    <li>
                                        <Link to='/profile' className='main-menu-item'>Profile</Link>
                                    </li>
                                    <li>
                                        <Link to='/search' className='main-menu-item'>Search</Link>
                                    </li>
                                    <li>
                                        <Link to='/home' className='main-menu-item'>Home</Link>
                                    </li>
                                    

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            {/* Header section end */}
        </>

    )
}

export default NavBar