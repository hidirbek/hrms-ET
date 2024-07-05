import React from "react";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import { Routes, Route } from "react-router-dom";

const index = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default index;
