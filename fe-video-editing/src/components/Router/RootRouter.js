import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { PrivateRouter } from "./PrivateRouter";
import SignUp from '../SignUp/SignUp'
import  Login  from "../Login/Login";
import RouterPath from "./RouterPath";



function RootRouter() {
    return (
      <>
        <Routes>
          <Route
            path="/login"
            element={<LoginPrivate element={<Login />} />}
            exact
          />
          <Route
            path="/signUp"
            element={<LoginPrivate element={<SignUp />} />}
            exact
          />
          <Route
            path="/*"
            element={
              <PrivateRouter
                element={
                    <RouterPath />
                }
              />
            }
          />
        </Routes>
      </>
    );
  }
  export default RootRouter;
  
  const LoginPrivate = ({ element }) => {
    if (Cookies.get("Token")) return <Navigate to="/" />;
    return element;
  };