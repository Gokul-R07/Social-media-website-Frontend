import React, { useState } from "react";
import "./Auth.css";

import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState(initialState);
  const [error, setError] = useState();

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const timeoutError = () => {
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (data.password === data.confirmpass) {
        const res = dispatch(signUp(data));
        res.then((value) => {
          if (value === undefined) {
            setIsSignUp(false);
          }
          setError(value);
          timeoutError();
        });
      } else {
        setError("Confirm password is not same");
        timeoutError();
      }
    } else {
      const res = dispatch(logIn(data));
      res.then((value) => {
        setError(value);
        timeoutError();
      });
    }
  };

  // Reset Form
  const resetForm = () => {
    setData(initialState);
  };
  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <div className="Webname">
          <span className="siteName">
            <b>Spectrum</b>
          </span>
          <span className="siteDes">Explore the dimensions of the world</span>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div className="nameDiv">
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="usernameDiv">
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div className="passDiv">
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          {error && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              *{error}
            </span>
          )}
          <div className="loginFooter">
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
