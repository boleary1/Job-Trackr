import React, { useState } from "react";
import logo from '../../assets/logo.png';
import { Spring } from 'react-spring/renderprops'
import API from "../../utils/PassportAPI";

function Register() {

  // set states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // event handlers
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    // check for valid fields
    if (!email || !password) {
      return;
    }
    // run api sign up
    API.signupUser({
      email: email,
      password: password
    }).then(() => window.location.replace("/dashboard"))
      .catch(err => console.log(err));
  }

  return (
    <div className="main-content login-bg">
      <div className="signupJumbo box">
        <div className="container singupContain">
          <img className="signin-logo" src={logo} alt="eye logo" />

          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 250, duration: 1000 }}
          >
            {props => (
              <div style={props}>
                <h1 className="title registerTitle">JOB TRACKR</h1>
              </div>
            )}
          </Spring>
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 500, duration: 1000 }}
          >
            {props => (
              <div style={props}>
                <form onSubmit={handleFormSubmit}>
                  <input type="text" placeholder="email" id="email" onChange={handleEmailChange}/>
                  <input type="password" placeholder="password" id="password" onChange={handlePasswordChange}/>
                  <a className="signUpHere" href="/">Sign In Here</a>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 750, duration: 1000 }}
                  >
                    {props => (
                      <div style={props}>
                        <button className="btn btn-default login-btn" id="signUpBtn">Sign Up</button>

                      </div>
                    )}
                  </Spring>
                </form>

              </div>
            )}
          </Spring>

        </div>
      </div>
    </div>

  );
};
export default Register;