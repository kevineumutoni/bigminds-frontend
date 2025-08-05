import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEyeOff, HiEye } from "react-icons/hi";
import './style.css';

const SignIn = ({ onSignInSuccess }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
  
    if (username && password) {
      onSignInSuccess();
    } else {
      alert("Please enter username and password.");
    }
  };

  const handleForgetPassword = () => {
    navigate('/resetemail')
  }

  return (
    <div className="signin-container">
      <div className="left-panel">
        <img src="assets/variant2-logo.png" alt="Safi Greens Logo" className="logo" />
      </div>
      <div className="right-panel">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn} autoComplete="off">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="username-input">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
                required
                className="username-number-input"
                autoComplete="username"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="password" htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <HiEye /> : <HiEyeOff />}
              </button>
            </div>
          </div>
          <div className="form-links">
            <p onClick={handleForgetPassword} className="forget-password">Forgot Password?</p>
          </div>
          <button type="submit" className="create-account">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;