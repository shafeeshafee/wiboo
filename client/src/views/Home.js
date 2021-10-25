import React from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function Home() {
  let history = useHistory();

  const redirect = () => {
    localStorage.clear();
    history.push("/signup");
    history.go(0);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <img
        src="https://media2.giphy.com/media/TS4lhxfqE6Ix2/giphy-downsized-large.gif"
        alt=""
      />
      <div className="centerize-col small-width">
        <Button
          onClick={redirect}
          variant="contained"
          style={{ background: "#E3963E", color: "#fff" }}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default Home;
