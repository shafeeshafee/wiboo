import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LogIn() {
  let history = useHistory();
  const [data, setData] = useState({ email: "", password: "" });

  const localStorageSet = (token) => {
    localStorage.setItem("loggedIn", token);
  };

  const redirect = () => {
    history.push("/home");
    history.go(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear();

    console.log(data);
    axios({
      method: "POST",
      url: "http://localhost:5000/auth/login",
      data,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        //handle success
        localStorageSet(response.data.token);
        console.log("Successfully LoggedIn.", response.data.token);
        redirect();
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });
  };
  return (
    <div className="centerize-util">
      <h1 className="centerize fancyText">Log In</h1>

      <form onSubmit={handleSubmit} className="centerize-col">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.username}
            type="text"
            placeholder="Email"
            label="Email"
            color="warning"
            style={{ width: "100%", display: "flex" }}
            focused
          />
          <br />
          <TextField
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
            type="password"
            placeholder="Password"
            label="Password"
            color="warning"
            style={{ width: "100%", display: "flex" }}
            focused
          />
        </Box>
        <div className="centerize">
          <Button
            type="submit"
            variant="contained"
            style={{ background: "#CC5500", color: "#fff" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
