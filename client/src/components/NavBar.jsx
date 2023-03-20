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
                          <Link to ='/home' className='link-logo'>
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
                            <a href="" className="site-btn header-btn">
                                Login
                            </a>
                            <nav className="main-menu">
                                <ul>
                                    <li>
                                        <Link to ='/home' className='main-menu-item'>Home</Link>
                                    </li>
                                    <li>
                                    <Link to ='/search' className='main-menu-item'>Search</Link>
                                    </li>
                                    {/* <li>
                                        <a href="courses.html">Courses</a>
                                    </li>
                                    <li>
                                        <a href="blog.html">News</a>
                                    </li>
                                    <li>
                                        <a href="contact.html">Contact</a>
                                    </li> */}
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