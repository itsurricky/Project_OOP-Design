import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "../Home/Home";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";



function RouterPath() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    );
  }
  
  export default RouterPath;