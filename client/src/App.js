import "./App.css";

import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Home from "./views/Home";
import Nav from "./components/Nav";
import SignUpContainer from "./components/SignUpContainer";
import TeamPage from "./views/TeamPage";

function App() {
  const isLoggedIn = () => {
    return localStorage.getItem("loggedIn");
  };

  return (
    <div className="App">
      <Nav />
      {!isLoggedIn() ? <Redirect to="/signup" /> : <Redirect to="/" />}
      <Switch>
        <Route exact path="/signup">
          <SignUpContainer />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/team">
          <TeamPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
