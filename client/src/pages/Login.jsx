import React,{useState} from 'react'
import signupbg from '../img/signup-bg.jpg'
import axios from 'axios'
function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]= useState('')
    const[name,setName]=useState('')
    const[password2,setPassword2]=useState('')
    const[signup,setSignup]=useState(false)
    const handleChange= async (e)=>{
        e.preventDefault()
        if(!signup){
        const token= await axios.post('http://127.0.0.1:8000/api/v2/login',{email,name,password,password2})
        console.log(token.data)
        }
        else{
        const token= await axios.post('http://127.0.0.1:8000/api/v2/register',{email,name,password,password2})
        console.log(token.data)
        }
    }

    return (!signup?
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
                                <form className="signin-form" onSubmit={handleChange}>
                                    <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Your Name" />
                                    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email" />
                                    <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Your Password" />
                                    <input type="password" onChange={(e)=>setPassword2(e.target.value)} placeholder="Your Password" />
                                    <button  className="file-up-btn">
                                        
                                    </button>
                                    <input type="submit" className="site-btn"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : 
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
                            <form className="signin-form" onSubmit={handleChange}>
                                <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Your Name" />
                                <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email" />
                                <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Your Password" />
                                <input type="password" onChange={(e)=>setPassword2(e.target.value)} placeholder="Your Password" />
                                <label htmlFor="v-upload" className="file-up-btn">
                                    New Sign Up
                                </label>
                                <input type="file" id="v-upload" />
                                <input type="submit" className="site-btn"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            
    )

}

export default Login