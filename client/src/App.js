import "./App.css";

import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Home from "./views/Home";
import Nav from "./components/Nav";
import SignUpContainer from "./components/SignUpContainer";

function App() {
  const isLoggedIn = () => {
    return localStorage.getItem("loggedIn");
  };

  console.log(isLoggedIn());
  return (
    <div className="App">
      <Nav />
      {!isLoggedIn() ? <Redirect to="/signup" /> : <Redirect to="/" />}
      <Switch>
        <Route path="/signup">
          <SignUpContainer />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
