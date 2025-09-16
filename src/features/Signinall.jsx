import React, { useState } from "react";
import "./signinall.css";

const Signin = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignIn = () => {
    // You can add your sign in API call here
    setSuccessMessage("Sign In successful! You can go to Home.");
    setTimeout(() => {
      setSuccessMessage("");
      window.location.href = "/home"; // Redirect to home page
    }, 2000);
  };

  const handleSignUp = () => {
    // You can add your sign up API call here
    setSuccessMessage("Sign Up successful! You can go to Home.");
    setTimeout(() => {
      setSuccessMessage("");
      window.location.href = "/home"; // Redirect to home page
    }, 2000);
  };

  return (
    <div className="signin-container">
      {/* Success Message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Sign In Box */}
      {!showSignup && (
        <div className="signin-box">
          <h2 className="signin-title">Login</h2>
          <input type="email" placeholder="Email" className="signin-input" />
          <input type="password" placeholder="Password" className="signin-input" />

          <div className="signin-checkbox">
            <input type="checkbox" id="showpass" />
            <label htmlFor="showpass">Show Password</label>
          </div>

          <button className="signin-btn" onClick={handleSignIn}>SIGN IN</button>

          <div className="signin-links">
            <p>
              Forgot <a href="#">Username / Password?</a>
            </p>
            <p>
              Don’t have an account?{" "}
              <a href="#" onClick={() => setShowSignup(true)}>Sign up</a>
            </p>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignup && (
        <div className="signup-modal">
          <div className="signup-box">
            <h2 className="signin-title">Sign Up</h2>
            <input type="text" placeholder="Full Name" className="signin-input" />
            <input type="email" placeholder="Email" className="signin-input" />
            <input type="password" placeholder="Password" className="signin-input" />
            <input type="password" placeholder="Confirm Password" className="signin-input" />

            <button className="signin-btn" onClick={handleSignUp}>SIGN UP</button>

            <div className="signin-links">
              <p>
                Already have an account?{" "}
                <a href="#" onClick={() => setShowSignup(false)}>Sign in</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
