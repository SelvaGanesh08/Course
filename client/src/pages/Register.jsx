import React from 'react'


function Register(){
    <>
   {/* signup section */}
   <section className="signup-section spad">
                <div className="signup-bg set-bg" data-setbg="img/signup-bg.jpg" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="signup-warp">
                                <div className="section-title text-white text-left">
                                    <h2>Register</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                        malesuada lorem maximus mauris scelerisque, at rutrum nulla
                                        dictum. Ut ac ligula sapien. Suspendisse cursus faucibus
                                        finibus.
                                    </p>
                                </div>
                                {/* signup form */}
                                <form className="signup-form">
                                    <input type="text" placeholder="Your Name" />
                                    <input type="text" placeholder="Your Phone" />
                                    <label htmlFor="v-upload" className="file-up-btn">
                                       has  Login
                                    </label>
                                    <input type="file" id="v-upload" />
                                    <button className="site-btn">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* signup section end */}
    </>
}


export default Register