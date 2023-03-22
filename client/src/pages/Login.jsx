import React from 'react'


function Login() {

    return (
            <section className="signin-section spad">
                <div className="signin-bg set-bg" data-setbg="img/signin-bg.jpg" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="signin-warp">
                                <div className="section-title text-white text-left">
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
            </section>
    )

}

export default Login