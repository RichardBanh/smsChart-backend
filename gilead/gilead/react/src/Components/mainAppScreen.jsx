import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from "./LoginPage";
import { useSelector } from "react-redux";
import { WorkingScreen } from "./Workingscreen";
import Cookies from "js-cookie";
export const Main = () => {
  const loggedinPass = useSelector((state) => state.login.signin);

  return (
    <Router>
      {loggedinPass || typeof Cookies.get("jwt") !== "undefined" ? (
        <WorkingScreen />
      ) : (
        <Login />
      )}
    </Router>
  );
};
