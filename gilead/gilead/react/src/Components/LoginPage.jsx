import React, { useState } from "react";
import { useDispatch } from "react-redux";
//dumbie authsection need to add loading screen
import { loginFetch } from "../Fetch-cookie/loginFetch";
import Cookies from "js-cookie";
export const Login = () => {
  const dis = useDispatch();
  const [userName, setUsername] = useState("");
  const [password, setPass] = useState("");

  return (
    <>
      <div className="loginWrapper">
        <form className="loginForm">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              loginFetch(
                { username: userName, password: password },
                dis,
                "SIGNIN",
                { username: userName, signin: true }
              );
            }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
