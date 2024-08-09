import React, { useEffect, useState } from "react";
import "./EmployeeList.css";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  EditEmployeeModal,
  AddEmployeeModal,
} from "../employeeModal/EmployeeModal";

import apiRequest from "../../service/request";

const EmployeeList = () => {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const role = decoded.role;

  const [employees, setEmployees] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  // console.log(employees);
  // console.log(searchValue);

  const searchEmployee = async (e) => {
    e.preventDefault();
    // console.log(e.target.value);

    try {
      // setLoading(true);
      const response = await apiRequest.get("/employees/search", {
        headers: { fullname: searchValue },
      });
      // console.log(response, "resp");
      setEmployees(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getEmployees = async () => {
    try {
      // setLoading(true);
      const response = await apiRequest.get("/employees/get_all");
      // console.log(response, "resp");
      setEmployees(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // setLoading(false);
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    // console.log(id);

    const response = await apiRequest.delete(`/employees/delete/${id}`);
    alert(response.message);
    // console.log(response.message);

    getEmployees();
  };

  let currentId = 0;

  function generateId() {
    return ++currentId;
  }

  if (!employees) {
    // console.log(departments);
    return <div>Loading...</div>;
  }

  return (
    <div className="employee_list-wrapper">
      <div className="search-add-wrapper">
        <div>
          {role === "admin" ? (
            <AddEmployeeModal refetchData={getEmployees} />
          ) : null}
        </div>
        <form onSubmit={searchEmployee} className="search-form">
          <input
            name="emp_search"
            value={searchValue}
            className="search-input"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>
      <div className="emp_list-content">
        <div className="emp_list-headers emp_list">
          <div>ID</div>
          <div>Full Name</div>
          <div>Contacts</div>
          <div>Departmnent</div>
          <div>Job Title</div>
          {role === "admin" && "hr" ? <div>Actions</div> : null}
        </div>
        {employees.map((emp) => {
          return (
            <div key={uuidv4()} className="emp_list">
              <div className="emp_id">{generateId()}</div>
              <div>{emp.fullname}</div>
              <div>
                <p className="emp_email">{emp.email}</p>
                <p className="emp_tel">{emp.tel}</p>
              </div>
              <div>
                <p className="emp_dep">{emp.department}</p>
                <p className="emp_div">{emp.division}</p>
              </div>
              <div>{emp.job_title}</div>
              {role === "admin" && "hr" ? (
                <div className="actions-wrapper">
                  <EditEmployeeModal
                    id={emp.id}
                    fullname={emp.fullname}
                    tel={emp.tel}
                    d_birth={emp.d_birth}
                    gender={emp.gender}
                    nation={emp.nation}
                    marriage={emp.marriage}
                    work_tel={emp.work_tel}
                    address={emp.address}
                    city={emp.city}
                    country={emp.country}
                    email={emp.email}
                    job_title={emp.job_title}
                    department={emp.department}
                    emp_status={emp.emp_status}
                    division={emp.division}
                    refetchData={getEmployees}
                  />
                  <DeleteOutlineIcon
                    onClick={() => deleteEmployee(emp.id)}
                    className="del_icon"
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeList;
