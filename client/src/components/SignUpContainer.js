import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import React, { createContext, useEffect, useState } from "react";

export const SignUpSuccess = createContext(0);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [val, setVal] = useState(0);
  const [signedUp, setSignedUp] = useState(false);

  const handleChange = (event, newValue) => {
    setVal(newValue);
  };

  const handleChangeIndex = (index) => {
    setVal(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSignedUp(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [signedUp]);

  return (
    <SignUpSuccess.Provider value={{ val, setVal, signedUp, setSignedUp }}>
      <div className="centerize">
        <Box sx={{ bgcolor: "background.primary", width: 500 }} mt={7}>
          <AppBar position="static">
            <Tabs
              sx={{
                backgroundColor: "#fabe4e",
              }}
              value={val}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Log In" {...a11yProps(0)} />
              <Tab label="Sign Up" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={val}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={val} index={0} dir={theme.direction}>
              <SignIn />
            </TabPanel>
            <TabPanel value={val} index={1} dir={theme.direction}>
              <SignUp />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
      {signedUp && (
        <div className="centerize" id="signed_up">
          <img
            height="40"
            width="40"
            src="https://www.svgrepo.com/show/286554/check.svg"
            alt=""
          />
          <h1>Successfully signed up. Please log in!</h1>
        </div>
      )}
    </SignUpSuccess.Provider>
  );
}
