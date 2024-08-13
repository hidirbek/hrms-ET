import React from "react";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Company from "../pages/company/Company";
import Calendar from "../pages/calendar/Calendar";
import Users from "../pages/users/Users";
import Employee from "../pages/employee/Employee";
import Documents from "../pages/documents/Documents";
import Trainings from "../pages/trainings/Trainings";
import Profile from "../pages/profile/Profile";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";

const index = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/v1/login" element={<Login />} />
        <Route path="/v1/dashboard" element={<Dashboard />} />
        <Route path="/v1/calendar" element={<Calendar />} />
        <Route path="/v1/company" element={<Company />} />
        <Route path="/v1/documents" element={<Documents />} />
        <Route path="/v1/employees" element={<Employee />} />
        <Route path="/v1/users" element={<Users />} />
        <Route path="/v1/trainings" element={<Trainings />} />
        <Route path="/v1/profile" element={<Profile />} />
        <Route path="/v1/forget_password" element={<ForgetPassword />} />
      </Routes>
    </>
  );
};

export default index;
