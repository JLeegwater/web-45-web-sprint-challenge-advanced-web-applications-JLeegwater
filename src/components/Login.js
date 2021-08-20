import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const { push } = useHistory();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    console.log(loginValues);
    axios
      .post("http://localhost:5000/api/login", loginValues)
      .then((res) => {
        //console.log("🚀 ~ file: Login.js ~ line 26 ~ .then ~ res", res);
        localStorage.setItem("token", res.data.payload);
        push("/bubbles-page");
      })
      .catch((err) => {
        console.log(err);
        setError("Username or Password is incorrect");
      });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={login}>
          <input
            id="username"
            type="text"
            name="username"
            value={loginValues.username}
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            name="password"
            value={loginValues.password}
            onChange={handleChange}
          />
          <button id="submit">Log in</button>
        </form>
      </div>

      <p id="error" className="error">
        {error}
      </p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"
