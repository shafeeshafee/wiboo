import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const logo = require("../Images/Wiboo-logos.jpeg");

  const isLoggedIn = () => {
    return localStorage.getItem("loggedIn");
  };

  return (
    <div className="nav">
      <Link to={isLoggedIn() ? "/" : "signup"}>
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <nav>
        <Link to={isLoggedIn() ? "/" : "signup"} className="links">
          Home
        </Link>
        <Link to="#" className="links">
          About Us
        </Link>
        <Link to="#" className="links">
          Team
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
