import React from "react";
import { Layout } from "../../components";
import "./Employee.css";
import EmployeeList from "../../components/employeeList/EmployeeList";

const Employee = () => {
  return (
    <Layout>
      <div className="employee_page">
        <h1 className="page_title">Employees</h1>
        <EmployeeList />
      </div>
    </Layout>
  );
};

export default Employee;
