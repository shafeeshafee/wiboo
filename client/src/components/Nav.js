import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Nav = () => {
  let history = useHistory();
  const logo = require("../Images/Wiboo-logos.jpeg");

  const isLoggedIn = () => {
    return localStorage.getItem("loggedIn");
  };

  const handleLogOut = () => {
    localStorage.clear();
    history.push("/signup");
    history.go(0);
  };

  return (
    <div className="nav">
      <Link to={isLoggedIn() ? "/" : "signup"}>
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <div className="nav-content">
        <Link to={isLoggedIn() ? "/" : "signup"} className="links">
          Home
        </Link>
        <Link to="#" className="links">
          Team
        </Link>
        <Link to="#" className="links">
          Contact
        </Link>
        {isLoggedIn() && (
          <Link to="/signup" className="links" onClick={handleLogOut}>
            Log Out
            <img
              src="https://www.svgrepo.com/show/20/user.svg"
              alt="loggedin-icon"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
