import React, { useState, useEffect, useContext } from "react";
import signupbg from "../img/signup-bg.jpg";
import axios from "axios";

import jwt from "jwt-decode";
import { Navigate, json } from "react-router-dom";
import { AuthContext } from "../components/Auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [password2, setPassword2] = useState("");
  const [signup, setSignup] = useState(false);
  const { isAuthenticated, setIsAuthenticated, setUserdata } =
    useContext(AuthContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://coursecuer-env.eba-murye7pz.us-west-2.elasticbeanstalk.com/api/v2/login", {
        email,
        password,
      });
      const { access, refresh } = response.data;
      const decodeToken = jwt(access);
      var now = new Date();
      // Set expiration time to 6 hours later from current time
      var expirationTime = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 6 hours = 6 * 60 minutes * 60 seconds * 1000 milliseconds
      setUserdata(decodeToken);
      localStorage.setItem("decode", JSON.stringify(decodeToken));
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://coursecuer-env.eba-murye7pz.us-west-2.elasticbeanstalk.com/api/v2/register",
        { email, name, password, password2 }
      );
      const { access, refresh } = response.data;
      // Set access and refresh tokens to localStorage or session storage
      const decodeToken = jwt(access);
      var now = new Date();
      // Set expiration time to 6 hours later from current time
      var expirationTime = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 6 hours = 6 * 60 minutes * 60 seconds * 1000 milliseconds
      setUserdata(decodeToken);
      localStorage.setItem("decode", JSON.stringify(decodeToken));
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleSignup = (e) => {
    e.preventDefault();
    setSignup(!signup);
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="signin-section spad-1">
      <div
        className="signin-bg set-bg"
        style={{ backgroundImage: `url(${signupbg})` }}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5">
            <div className="signin-warp">
              <div className="section-title text-white ">
                <h2>Login</h2>
              </div>
              {/* signin form */}
              <form
                className="signin-form"
                onSubmit={signup ? handleSignupSubmit : handleLoginSubmit}
              >
                {signup && (
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                  />
                )}
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                />
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                />
                {signup && (
                  <input
                    type="password"
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Confirm Password"
                  />
                )}

                <button onClick={handleToggleSignup} className="file-up-btn">
                  {signup ? "Sign In" : "Sign Up"}
                </button>
                <input type="submit" className="site-btn" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
