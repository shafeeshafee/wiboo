import axios from "axios";
import React, { useState, useContext } from "react";

import { Box, TextField, Button } from "@mui/material";

import { SignUpSuccess } from "./SignUpContainer";

function SignUp() {
  const { val, setVal, signedUp, setSignedUp } = useContext(SignUpSuccess);

  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: `${process.env.SERVER_URL}/auth/signup`,
      data,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        //handle success
        console.log("Successfully signed up,", response);
        setVal(0);
        setSignedUp((val) => !val);
      })
      .catch((err) => {
        //handle error
        console.error(err.message);
      });
  };

  return (
    <div>
      <div className="centerize-util">
        <h1 className="centerize fancyText">Create a New Account</h1>
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
    </div>
  );
}

export default SignUp;
