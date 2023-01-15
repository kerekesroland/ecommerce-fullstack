import "./Auth.scss";
import { useState } from "react";

const Auth = () => {
  const [isSignedUpMode, setIsSignedUpMode] = useState<boolean>(false);

  const handleToggle = () => setIsSignedUpMode(!isSignedUpMode);

  const dynamicClass = isSignedUpMode ? "auth sign-up-mode" : "auth";

  return (
    <div className={dynamicClass}>
      <div className="container">
        <div className="inner-container">
          <div className="forms-wrapper">
            <form className="sign-up">
              <div className="top">
                <h2>Create account!</h2>
              </div>
              <div className="center">
                <div className="inputs">
                  <input
                    type="text"
                    minLength={4}
                    placeholder="Username"
                    required
                  />
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>
              <div className="bottom">
                <button>Sign Up</button>
                <p className="no-account toggle" onClick={handleToggle}>
                  Already a member?{" "}
                  <span className="sign-in-btn"> Sign in </span>
                </p>
                <p className="no-account">
                  I agree to the terms of services by signing up
                </p>
              </div>
            </form>

            <form className="sign-in">
              <div className="top">
                <h2>Welcome back!</h2>
              </div>
              <div className="center">
                <div className="inputs">
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                </div>
              </div>
              <div className="bottom">
                <button>Sign In</button>
                <p className="no-account toggle" onClick={handleToggle}>
                  Don't have an account?{" "}
                  <span className="sign-up-btn">Click here!</span>
                </p>
                <p className="forgot-password">Forgot your password?</p>
              </div>
            </form>
          </div>
          <div className="image">
            <div className="img-wrapper">
              <img src={require("../../images/men-fashion-min.jpg")} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
