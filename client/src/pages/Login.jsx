import React, { useState } from 'react'
import signupbg from '../img/signup-bg.jpg'
import axios from 'axios'
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [password2, setPassword2] = useState('')
    const [signup, setSignup] = useState(false)

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const token = await axios.post('http://127.0.0.1:8000/api/v2/login',{ email, password });
        console.log(token.data);
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const token= await axios.post('http://127.0.0.1:8000/api/v2/register',{email,name,password,password2})
        console.log(token.data);
    };

    const handleToggleSignup = (e) => {
        e.preventDefault();
        setSignup(!signup);
    };

    return (
        <div className="signin-section spad-1">
            <div className="signin-bg set-bg" style={{ backgroundImage: `url(${signupbg})` }} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="signin-warp">
                            <div className="section-title text-white ">
                                <h2>Login</h2>
                            </div>
                            {/* signin form */}
                            <form className="signin-form" onSubmit={signup ? handleSignupSubmit : handleLoginSubmit}>
                                {signup && <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Your Name" />}
                                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
                                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Your Password" />
                                {signup && <input type="password" onChange={(e) => setPassword2(e.target.value)} placeholder="Confirm Password" />}
                                <button onClick={handleToggleSignup} className="file-up-btn">
                                    {signup ? 'Sign In' : 'Sign Up'}
                                </button>
                                <input type="submit" className="site-btn" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )

}

export default Login