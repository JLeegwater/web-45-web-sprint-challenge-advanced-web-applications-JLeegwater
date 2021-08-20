import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import axiosWithAuth from "./helpers/axiosWithAuth";
import Login from "./components/Login";
import "./styles.scss";

function App() {
  const logout = () => {
    axiosWithAuth()
      .post("http://localhost:5000/api/logout")
      .then((res) => {
        console.log("🚀 ~ file: App.js ~ line 14 ~ .then ~ res", res);
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
      .catch((err) => console.error(err));
  };

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#" onClick={logout}>
            logout
          </a>
        </header>

        <Switch>
          <PrivateRoute path="/bubbles-page" component={BubblePage} />

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.
