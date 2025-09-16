import React, { useState } from "react";
import "../features/Signinall.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="signin-title">Sign Up</h2>

        <form className="signin-form">
          <input type="text" placeholder="Full Name" className="signin-input" required />
          <input type="email" placeholder="Email" className="signin-input" required />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="signin-input"
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="signin-input"
            required
          />

          <div className="signin-checkbox">
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <button type="submit" className="signin-btn">
            SIGN UP
          </button>
        </form>

        <div className="signin-links">
          <p>
            Already have an account? <a href="/">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
