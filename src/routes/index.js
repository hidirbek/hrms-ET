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

const index = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/company" element={<Company />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/users" element={<Users />} />
        <Route path="/trainings" element={<Trainings />} />
      </Routes>
    </>
  );
};

export default index;
