import React from 'react'
import signupbg from '../img/signup-bg.jpg'

function Login() {

    return (
            <div className="signin-section spad-1">
                <div className="signin-bg set-bg" style={{backgroundImage:`url(${signupbg})`}}  />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="signin-warp">
                                <div className="section-title text-white ">
                                    <h2>Login</h2>
                                </div>
                                {/* signin form */}
                                <form className="signin-form">
                                    <input type="text" placeholder="Your Name" />
                                    <input type="text" placeholder="Your Phone" />
                                    <label htmlFor="v-upload" className="file-up-btn">
                                        New Sign Up
                                    </label>
                                    <input type="file" id="v-upload" />
                                    <button className="site-btn">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )

}

export default Login